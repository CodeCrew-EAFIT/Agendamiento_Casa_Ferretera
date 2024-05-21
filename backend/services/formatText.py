import unidecode

def formatText(text):
    # Remove accent marks
    text = unidecode.unidecode(text)
    # Convert to lowercase
    text = text.lower()
    # Replace spaces with underscores
    text = text.replace(' ', '_')
    text = text.replace('-', '_')
    return text