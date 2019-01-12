import requests

def count_words_at_url(url):
    #todo: create a function that checks the database to see if there are any already in twitter users already false
    resp = requests.get(url)
    return len(resp.text.split())
