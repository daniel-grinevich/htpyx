from urllib.parse import unquote, parse_qs
import json


class HtmxMiddleware:
    @staticmethod
    def preprocess_request(request):
        # Check if the request is an HTMX request
        htmx = getattr(request, "HTTP_HX_REQUEST", None)
        if htmx:
            if getattr(request, "REQUEST_METHOD") == "POST":
                content_length = int(getattr(request, "CONTENT_LENGTH", 0))
                encoded_body = getattr(request, "wsgi_input").read(content_length)
                decoded_body = unquote(encoded_body.decode("utf-8"))
                body = parse_qs(decoded_body)

                setattr(request, "htmx-data", body)

            if getattr(request, "REQUEST_METHOD") == "GET":
                # Extract the query string from the request
                query_string = getattr(request, "QUERY_STRING", None)
                # Decode the URL-encoded query string
                decoded_query_string = unquote(query_string)
                # Parse the query string into a dictionary of parameters
                params = parse_qs(decoded_query_string)
                # Attempt to extract and parse the 'myVals' JSON string
                my_vals_json = params.get("myVals", [None])[0]
                if my_vals_json:
                    # Parse the JSON string into a Python dictionary
                    my_vals = json.loads(my_vals_json)
                    print(my_vals)  # Output the parsed JSON for debugging
                    # Add the parsed JSON to the request object for further processing
                    setattr(request, "htmx-data", my_vals)
                else:
                    # Handle cases where 'myVals' parameter is not provided or is empty
                    setattr(request, "htmx-data", None)

        return request

    @staticmethod
    def postprocess_request(status, headers, body, request):
        return status, headers, body, request
