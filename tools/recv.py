import http.server, os, urllib.parse
ROOT = "/Users/pearl/Desktop/Projects/Playpower_labs/airbnb-clone/public/assets"

class H(http.server.BaseHTTPRequestHandler):
    def cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")

    def do_OPTIONS(self):
        self.send_response(204); self.cors(); self.end_headers()

    def do_POST(self):
        q = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
        name = q.get("name", [""])[0]
        # path traversal guard
        dest = os.path.realpath(os.path.join(ROOT, name))
        if not dest.startswith(os.path.realpath(ROOT) + os.sep):
            self.send_response(400); self.cors(); self.end_headers(); return
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        n = int(self.headers.get("Content-Length", 0))
        with open(dest, "wb") as f:
            f.write(self.rfile.read(n))
        self.send_response(200); self.cors(); self.end_headers()
        self.wfile.write(b"ok")

    def log_message(self, *a): pass

http.server.HTTPServer(("127.0.0.1", 8899), H).serve_forever()
