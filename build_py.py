files = ["mc_base", "Structure", "Item" , "Contrainer", "Block", "main"]

imports, others = set(), []
for f in files:
    lines = open(f + '.py').readlines()
    if f == 'mc_base':
        lines = lines[68:]
    
    for line in lines:
        if line.startswith("import") or line.startswith("from") and line.split(' ')[1] not in files:
            imports.add(line)
        else:
            if line.startswith("import") or line.startswith("from") and line.split(' ')[1] in files:
                continue
            
            others.append(line)
    others.append('\n')

with open("easyplace.py", "w") as out:
    lines = sorted(imports) + others
    res = ''.join(lines)
    out.write(res)

with open("manifest.json", "w") as out:
    out.write("""
{
    "entry": "easyplace.py",
    "name": "easyplace",
    "type": "lse-python",
    "dependencies": [
        {
            "name": "legacy-script-engine-python"
        }
    ]
}
""")