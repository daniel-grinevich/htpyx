


document.body.addEventListener('htmx:afterSwap', function() {
    const teminal = document.getElementById('terminal');    
    const code_snippets = [
        {
            "name": "dispatch",
            "code": `<div><span class="purple-code">def</span> <span class="blue-code">dispatch</span>(<span class="red-code">self</span>, request):</div>
                            <div style="padding-left: 20px;">htmx = <span class="blue-code">getattr</span>(request, <span class="green-code">"HTTP_HX_REQUEST"</span>, None)</div>
                            <div style="padding-left: 20px;">method = <span class="blue-code">getattr</span>(request, <span class="green-code">"REQUEST_METHOD"</span>, None)</div>
                            <div style="padding-left: 20px;"><span class="purple-code">if</span> <span class="blue-code">hasattr</span>(<span class="red-code">self</span>, method.lower()):</div>
                            <div style="padding-left: 40px;"><span class="purple-code">if</span> htmx:</div>
                            <div style="padding-left: 60px;">handler = <span class="blue-code">getattr</span>(<span class="red-code">self</span>, <span class="orange-code">"reactive"</span>)</div>
                            <div style="padding-left: 60px;">component = <span class="blue-code">getattr</span>(request, <span class="green-code">"HTTP_X_COMPONENT"</span>)</div>
                            <div style="padding-left: 60px;"><span class="purple-code">return</span> handler(request, component)</div>
                            <div style="padding-left: 40px;"><span class="purple-code">else</span>:</div>
                            <div style="padding-left: 60px;">handler = <span class="blue-code">getattr</span>(<span class="red-code">self</span>, method.lower())</div>
                            <div style="padding-left: 60px;"><span class="purple-code">return</span> handler()</div>
                            <div style="padding-left: 20px;"><span class="purple-code">elif</span> <span class="blue-code">hasattr</span>(super(), method.lower()):</div>
                            <div style="padding-left: 40px;">handler = <span class="blue-code">getattr</span>(super(), method.lower())</div>
                            <div style="padding-left: 40px;"><span class="purple-code">return</span> handler()</div>
                            <div style="padding-left: 20px;"><span class="purple-code">else</span>:</div>
                            <div style="padding-left: 40px;"><span class="purple-code">return</span> <span class="red-code">self</span>.<span class="orange-code">http_method_not_allowed</span>()</div>`,
            "description": `The dispatch method is called when the view is accessed by the router. It looks for the method that matches the request method on the child view class. If there is no method then it will call the method on the parent (base) view class.`
        },
        {
            "name": "get",
            "code": `<div><span class="purple-code">def</span> <span class="blue-code">get</span>(<span class="red-code">self</span>):</div>
                    <div style="padding-left: 20px;">headers = [(<span class="green-code">"Content-Type"</span>, <span class="green-code">"text/html"</span>)]</div>
                    <div style="padding-left: 20px;">status = <span class="green-code">"200 OK"</span></div>
                    <div style="padding-left: 20px;">context_data = <span class="red-code">self</span>.get_context_data()</div>
                    <div style="padding-left: 20px;">components = <span class="red-code">self</span>.components</div>
                    <div style="padding-left: 20px;">body = <span class="red-code">self</span>.render(</div>
                    <div style="padding-left: 40px;">base_template=<span class="red-code">self</span>.base_template,</div>
                    <div style="padding-left: 40px;">view_template=<span class="red-code">self</span>.template(),</div>
                    <div style="padding-left: 40px;">context_data=context_data,</div>
                    <div style="padding-left: 40px;">components=components,</div>
                    <div style="padding-left: 20px;">)</div>
                    <div style="padding-left: 20px;"><span class="blue-code">return</span> (status, headers, body)</div>`,
            "description": `The get method is called when the view is accessed by the router. It looks for the method that matches the request method on the child view class. If there is no method then it will call the method on the parent (base) view class.`
        },
        {
            "name": "render",
            "code": `<div><span class="purple-code">def</span> <span class="blue-code">render</span>(<span class="red-code">self</span>, **kwargs):</div>
                    <div style="padding-left: 20px;">base_template = kwargs.get(<span class="green-code">"base_template"</span>, None)</div>
                    <div style="padding-left: 20px;">view_template = kwargs.get(<span class="green-code">"view_template"</span>, None)</div>
                    <div style="padding-left: 20px;">data = kwargs.get(<span class="green-code">"context_data"</span>, None)</div>
                    <div style="padding-left: 20px;">components = kwargs.get(<span class="green-code">"components"</span>, None)</div>
                    <div style="padding-left: 20px;"><span class="blue-code">if</span> base_template is None:</div>
                    <div style="padding-left: 40px;">raise <span class="orange-code">ValueError</span>(<span class="green-code">"No base template was provided; cannot render without a base template file."</span>)</div>
                    <div style="padding-left: 20px;"><span class="blue-code">if</span> data is None:</div>
                    <div style="padding-left: 40px;">raise <span class="orange-code">ValueError</span>(<span class="green-code">"No context data was provided, you have to pass at least an empty dictionary."</span>)</div>
                    <div style="padding-left: 20px;">engine = <span class="blue-code">TemplateEngine</span>()</div>
                    <div style="padding-left: 20px;">content = engine.<span class="blue-code">render</span>(</div>
                    <div style="padding-left: 40px;">base_template=base_template,</div>
                    <div style="padding-left: 40px;">view_template=view_template,</div>
                    <div style="padding-left: 40px;">context_data=data,</div>
                    <div style="padding-left: 40px;">components=components,</div>
                    <div style="padding-left: 20px;">)</div>
                    <div style="padding-left: 20px;"><span class="blue-code">return</span> content</div>`,
            "description": `The render method is called when the view is accessed by the router. It looks for the method that matches the request method on the child view class. If there is no method then it will call the method on the parent (base) view class.`
        },
        {
            "name": "reactive",
            "code": ` <div><span class="purple-code">def</span> <span class="blue-code">reactive</span>(<span class="red-code">self</span>, request, c):</div>
                        <div style="padding-left: 20px;"><span class="red-code">component</span> = <span class="red-code">self</span>.components.get(c)</div>
                        <div style="padding-left: 20px;"><span class="blue-code">if</span> <span class="blue-code">hasattr</span>(<span class="red-code">component</span>, <span class="green-code">"reactive"</span>):</div>
                        <div style="padding-left: 40px;">reactive_method = <span class="blue-code">getattr</span>(<span class="red-code">component</span>, <span class="green-code">"reactive"</span>, None)</div>
                        <div style="padding-left: 40px;"><span class="blue-code">return</span> reactive_method(request)</div>
                        <div style="padding-left: 20px;"><span class="blue-code">else</span>:</div>
                        <div style="padding-left: 40px;">raise <span class="orange-code">ValueError</span>(<span class="green-code">"HTMX call on a component with no HTMX"</span>)</div>`,
            "description": `The reactive method is called when the view is accessed by the router. It looks for the method that matches the request method on the child view class. If there is no method then it will call the method on the parent (base) view class.`
        }
    ]

    if (teminal) {
        const dispatch = document.getElementById('dispatch');
        const get = document.getElementById('get');
        const render = document.getElementById('render');
        const reactive = document.getElementById('reactive');
        const code_description = document.getElementById('code-description');

        let code_selections = [dispatch, get, render, reactive];

        code_selections.forEach(function(option) {
            option.addEventListener('mouseover', function() {
                if (option.getAttribute('data-value') === 'selected') {
                    return;
                }
                let edge = option.getElementsByTagName('div');
                edge[0].classList.add('fill_out_box');
            });
            option.addEventListener('mouseout', function() {
                if (option.getAttribute('data-value') === 'not-selected') {
                    let edge = option.getElementsByTagName('div');
                    edge[0].classList.remove('fill_out_box');
                }
                
            });
            option.addEventListener('click', function() {
                let edge = option.getElementsByTagName('div')[0]; // Direct reference to the first div
                code_selections.forEach(function(x) {
                    let xEdge = x.getElementsByTagName('div')[0];
                    if (x.getAttribute('data-value') === 'selected') {
                        xEdge.classList.remove('w-full');
                        xEdge.classList.remove('fill_out_box');
                        xEdge.classList.add('w-1');
                    }
                    x.setAttribute('data-value', 'not-selected');
                });
                option.setAttribute('data-value', 'selected');
                edge.classList.remove('w-1');
                edge.classList.add('w-full');
                // Get code snippet by option id 
                terminal.innerHTML = '';
                console.log(option.id);

                for (let i = 0; i < code_snippets.length; i++) {
                    if (code_snippets[i].name === option.id) {
                        terminal.innerHTML = code_snippets[i].code;
                        code_description.innerHTML = code_snippets[i].description;
                    }
                }
            });
        });

    }
});