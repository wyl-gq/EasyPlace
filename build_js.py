files = ["mc_base", "Structure", "Item" , "Contrainer", "Block", "main"]

others = []
for f in files:
    lines = open(f + '.js').readlines()
    for line in lines:
        if line.startswith("const { ") or line.startswith(");") and line.split(' ')[1] in files:
            continue
        
        others.append(line)
    others.append('\n')

with open("easyplace.js", "w") as out:
    res = ''.join(others)
    out.write(res)
    
with open("manifest.json", "w") as out:
    out.write("""
{
    "entry": "easyplace.js",
    "name": "easyplace",
    "type": "lse-quickjs",
    "dependencies": [
        {
            "name": "legacy-script-engine-quickjs"
        }
    ]
}
""")
    
    