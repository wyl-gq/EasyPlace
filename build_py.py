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
    
import ast
import re
from typing import Optional
def remove_type_hints_from_file(input_file: str, output_file: Optional[str] = None):
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 使用 AST 解析
    tree = ast.parse(content)
    
    # 遍历 AST 并移除类型注解
    for node in ast.walk(tree):
        # 移除函数参数的类型提示
        if isinstance(node, ast.FunctionDef):
            for arg in node.args.args:
                arg.annotation = None
            node.returns = None
        
    # 转换为代码
    new_content = ast.unparse(tree)
    
    # 输出
    output_path = output_file or input_file
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    return new_content

remove_type_hints_from_file("easyplace.py", "easyplace.py")

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