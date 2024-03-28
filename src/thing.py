f = open("file.txt", "r")
newString = []
for items in f:
    newString.append("Backup job " + items[:-1] + " finished with Success.")

for i in newString:
    print(i)