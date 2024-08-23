import csv, firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

def get_select_values(filename, position, outputfile="select_values.html"):
    """Create the list of all the branches or unique values of a column and convert to html select value"""
    # 1. Reading Data From Source File
    source_file = open(filename, 'r')
    data = csv.reader(source_file)

    # 2. separating unique values to string
    unique_values = list()
    for i in data:
        if i[position] not in unique_values:
            unique_values.append(i[position])

    # 3. formatting the final list
    final_list = list()
    for i in unique_values:
        final_list.append(f"<option value='{i}'>{i}</option>\n")

    # 4. Writing Output Data
    with open(outputfile, 'w') as f2:
        f2.writelines(final_list)

def push_data_to_firebase(secret_file, filename, round):
    """Pushes data from csv to firebase firestore"""
    cred = credentials.Certificate(secret_file)
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    collection_ref = db.collection('btech')

    f= open(filename, 'r')
    data = csv.reader(f)


    for i in data:
        doc_ref = collection_ref.add({
            'round': str(round),
            'name': i[2],
            'branch': i[3],
            'quota': i[5],
            'category': i[6],
            'or': int(float(i[8])),
            'cr': int(float(i[9]))
        })
        print(f"[{i[0]}/1835] Succesfully Added '{i[2]}' to Database!")