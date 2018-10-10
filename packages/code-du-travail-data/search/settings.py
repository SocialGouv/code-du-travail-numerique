import os
import logging

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def get_logger(name, level=logging.INFO):
    console = logging.StreamHandler()
    formatter = logging.Formatter(fmt='[%(levelname)s - %(funcName)s] %(message)s')
    console.setFormatter(formatter)
    logger = logging.getLogger(name)
    logger.addHandler(console)
    logger.setLevel(level)
    return logger
