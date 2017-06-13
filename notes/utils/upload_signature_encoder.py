import OpenSSL
from OpenSSL import crypto
import base64

key_file = open("thiago.pem", "r")
key = key_file.read()
key_file.close()
password = "notasecret"


pkey = crypto.load_privatekey(crypto.FILETYPE_PEM, key, password)

data = "eyJleHBpcmF0aW9uIjogIjIwMjAtMDYtMTZUMTE6MTE6MTFaIiwKICJjb25kaXRpb25zIjogWwogIFsic3RhcnRzLXdpdGgiLCAiJGtleSIsICIiIF0sCiAgeyJhY2wiOiAiYnVja2V0LW93bmVyLXJlYWQiIH0sCiAgeyJidWNrZXQiOiAibm90ZXNfbWVkaWEifSwKICBbInN0YXJ0cy13aXRoIiwgIiRDb250ZW50LVR5cGUiLCAiaW1hZ2UiIF0sCiAgXQp9"
sign = OpenSSL.crypto.sign(pkey, data, "sha256")

data_base64 = base64.b64encode(sign)
print data_base64
