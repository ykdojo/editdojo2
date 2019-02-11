# For simplicity, this function will break text by 
# line breaks for now. However, later, modify this
# function so that it will break it by sentences.
# 
# An example of the current implementation:
# 
# Suppose that:
# given_text =
"""Are you looking to learn React at some point?

According to @ilyas_assainov, you should master these concepts before learning it:
- HTML and CSS concepts
- Basic programming concepts
 - JavaScript DOM manipulation
- ES6+ syntax 

More about it here:
https://t.co/VhiwdvWYDT"""

# Then, split_text_into_sentences(given_text) should return:
# [
#   'Are you looking to learn React at some point?',
#   'According to @ilyas_assainov, you should master these concepts before learning it:',
#   '- HTML and CSS concepts',
#   '- Basic programming concepts',
#   '- JavaScript DOM manipulation',
#   '- ES6+ syntax',
#   'More about it here:',
#   'https://t.co/VhiwdvWYDT',
# ]
# (NOTE: the output strips out any leading and trailing white spaces.)



def split_text_into_sentences(text):
    split = text.splitlines()
    stripped = list(map(lambda x: x.strip(), split))
    filtered = list(filter(lambda x: len(x) > 0, stripped))
    return filtered
