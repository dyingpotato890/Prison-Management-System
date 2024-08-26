import hashlib

class password:
    def hash_password(self, password: str) -> str:
        h = hashlib.new("sha256")
        h.update(bytes(password,'utf-8'))
        return h.hexdigest()