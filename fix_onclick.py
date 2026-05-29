import glob
import re

for path in glob.glob("/var/www/html/heemagold/*.html"):
    with open(path, "r") as f:
        content = f.read()
    
    content = re.sub(r'onclick=[\'"].*?classList\.toggle.*?[\'"]', '', content)
    
    with open(path, "w") as f:
        f.write(content)
