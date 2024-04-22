import csv

# Example data
data = [
    ['Name', 'Age', 'Country'],
    ['John Doe', 30, 'USA'],
    ['Jane Smith', 25, 'Canada'],
    ['Ahmed Ali', 35, 'Egypt'],
]

# Specify the file name
filename = 'data.csv'

# Write data to CSV file
with open(filename, 'w', newline='') as csvfile:
    csvwriter = csv.writer(csvfile)
    
    # Write each row
    for row in data:
        csvwriter.writerow(row)