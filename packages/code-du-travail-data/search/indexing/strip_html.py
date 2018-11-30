from html.parser import HTMLParser

class MLStripper(HTMLParser):
    def __init__(self):
        self.reset()
        self.strict = False
        self.convert_charrefs = True
        self.fed = []
    def handle_data(self, data):
        self.fed.append(data)
    def get_data(self):
        return ''.join(self.fed)
    def error(self, message):
        print(message)

def strip_html(html):
    s = MLStripper()
    s.feed(html)
    return s.get_data()
