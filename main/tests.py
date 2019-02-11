from django.test import TestCase
from .helper import split_text_into_sentences

class HelperTestCase(TestCase):
    def setUp(self):
        pass

    def test_split_text_into_sentences(self):
        given_text ="""Are you looking to learn React at some point?

According to @ilyas_assainov, you should master these concepts before learning it:
- HTML and CSS concepts
- Basic programming concepts
 - JavaScript DOM manipulation
- ES6+ syntax 

More about it here:
https://t.co/VhiwdvWYDT"""

        actual = split_text_into_sentences(given_text)

        expected = [
            'Are you looking to learn React at some point?',
            'According to @ilyas_assainov, you should master these concepts before learning it:',
            '- HTML and CSS concepts',
            '- Basic programming concepts',
            '- JavaScript DOM manipulation',
            '- ES6+ syntax',
            'More about it here:',
            'https://t.co/VhiwdvWYDT',
        ]

        self.assertEqual(actual, expected)