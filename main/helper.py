# For simplicity, this function will break text by 
# line breaks for now. However, later, modify this
# function so that it will break it by sentences.
# 
# An example of the current implementation:
# 
# Suppose that:
# given_text = 'Are you looking to learn React at some point?\n\nAccording to @ilyas_assainov, you should master these concepts before learning it:\n- HTML and CSS concepts\n- Basic programming concepts\n- JavaScript DOM manipulation\n- ES6+ syntax\n\nMore about it here:\nhttps://t.co/VhiwdvWYDT'
#
# Then, print(given_text) would print the following.
"""Are you looking to learn React at some point?

According to @ilyas_assainov, you should master these concepts before learning it:
- HTML and CSS concepts
- Basic programming concepts
 - JavaScript DOM manipulation
- ES6+ syntax 

More about it here:
https://t.co/VhiwdvWYDT"""
# split_text_into_sentences(given_text) should return:
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
    pass