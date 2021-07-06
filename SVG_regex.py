# Regex 1
# Find (<[<!\-A-Za-z \/=":0-9.\n\t;>,#}{]+>\n) Replace () 
# Regex 2
# Find (<path id="[A-Za-z_0-9]+" class="[A-Za-z_0-9]+" d=) Replace ()
# Regex 3
# Find (/>) Replace (, )
# Regex 3
# Find (\n\t) Replace ( )
# Delete end tags
# Add brackets at ends

import re

if __name__ == '__main__':
    print('Getting file contents...', end='')
    fp = 'resources/svg.txt'
    file_r = open(fp, 'r')
    file_string = file_r.read()
    file_r.close()
    print('Done')
    print('Prepping string...', end='')
    file_string = re.sub(r'<[<!\-A-Za-z \/=":0-9.\n\t;>,#}{]+>\n', '', file_string)
    file_string = re.sub(r'<path id="[A-Za-z_0-9]+" class="[A-Za-z_0-9]+" d=', '', file_string)
    file_string = re.sub(r'/>', ', ', file_string)
    file_string = re.sub(r'\n    ', ' ', file_string)
    file_string = '[' + file_string + ']'
    print('Done')
    print('Rewriting file...', end='')
    file_w = open(fp, 'w')
    file_w.truncate()
    file_w.write(file_string)
    print('Done')
    file_w.close()
