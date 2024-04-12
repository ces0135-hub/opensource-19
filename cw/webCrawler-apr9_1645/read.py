import csv

filename = "result.csv"

count = 0
with open(filename, "r") as file:
    reader = csv.reader(file)
    for row in reader:
        count += len(row)

print(count)