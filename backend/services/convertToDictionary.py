
def convertToDictionary(response):
    listOfDictionaries = []
    if type(response) is not list:
        response = [response]
    for object in response:
        listOfDictionaries.append(object._asdict())
    return listOfDictionaries