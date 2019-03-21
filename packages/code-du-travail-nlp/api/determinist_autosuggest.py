import re
from collections import Counter, defaultdict
import json
from itertools import chain

link_path = "./data/data-test.txt"
stops_path = "./data/stops.txt"

def load_titles(link_path):
    with open(link_path, encoding = "utf-8") as f:
        d = f.read().splitlines()
    return d

def load_stops(stops_path):
    with open(stops_path, encoding = "utf-8") as f:
        stops = f.read().splitlines()
    return stops

class autoSuggestor:
    def __init__(self, link_path, stops_path):
        self.titles = load_titles(link_path)
        self.stops = load_stops(stops_path)
        self._build_dict()
        self._init_precount()

    def _build_dict(self):
        self.d = defaultdict(list)
        for t in self.titles:
            self.d[t[:1]].append(t)
            self.d[t[:2]].append(t)
            self.d[t[:3]].append(t)
            self.d[t[:4]].append(t)

    def _request_dict(self, req):
        filtered_dic = self.d[req[:4]]
        res = [t for t in filtered_dic if t.startswith(req)]
        return res

    def _init_precount(self):
        from itertools import combinations
        from string import ascii_lowercase

        precount = defaultdict(list)
        letters_prefix = [a + b for a, b in combinations(ascii_lowercase, 2)]
        letters_prefix += [a for a in ascii_lowercase]

        for char in letters_prefix:
            precount[char] = self.auto_suggest_skip(char)

        self.precount = precount

    def auto_suggest(self, pref, n = 10, freq_min = 5):
        len_pref = len(pref.split())
        suggestions = [t for t in self.titles if t.startswith(pref.lower())]
        most_common = Counter([" ".join(sg.split()[:(len_pref + 2)]) for sg in suggestions]).most_common(n)
        return [(m[0], m[1] ) for m in most_common if m[1] > freq_min]

    def auto_suggest_skip(self, pref, n = 10, freq_min = 5, nb_next_words = 2):
        #function to suggest next words in user query, skipping stopwords
        if pref == "":
             return []
        len_pref = len(pref.lower().split())
        suggestions = [t for t in self.titles if t.startswith(pref.lower())]
        suggestions = [sg.split() for sg in suggestions]
        suggest_ = [sg[:(len_pref + nb_next_words + 1)] if sg[:(len_pref + nb_next_words)][-1] in self.stops else sg[:(len_pref + nb_next_words)] for sg in suggestions]
        most_common = Counter([" ".join(sg) for sg in suggest_]).most_common(n)
        return [(m[0], m[1] ) for m in most_common if m[1] > freq_min]

    def auto_suggest_fast(self, pref, n = 10, freq_min = 5, nb_next_words = 2):
        if pref == "":
             return [[], []]
        len_pref = len(pref.split())
        if pref in self.precount.keys():
            return self.precount[pref]
        suggestions = self._request_dict(pref.lower())
        suggestions = [sg.split() for sg in suggestions]
        suggest_ = [sg[:(len_pref + nb_next_words + 1)] if sg[:(len_pref + nb_next_words)][-1] in self.stops else sg[:(len_pref + nb_next_words)] for sg in suggestions]
        most_common = Counter([" ".join(sg) for sg in suggest_]).most_common(n)
        return [(m[0], m[1] ) for m in most_common if m[1] > freq_min]
