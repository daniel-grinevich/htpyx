// const includes = `
// #define NUM_OCTAVES 5

// float rand(vec2 n) { 
//     return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
// }

// float noise(vec2 p){
//     vec2 ip = floor(p);
//     vec2 u = fract(p);
//     u = u*u*(3.0-2.0*u);
    
//     float res = mix(
//         mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
//         mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
//     return res*res;
// }

// float fbm(vec2 x) {
//     float v = 0.0;
//     float a = 0.5;
//     vec2 shift = vec2(100);
//     // Rotate to reduce axial bias
//     mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
//     for (int i = 0; i < NUM_OCTAVES; ++i) {
//         v += a * noise(x);
//         x = rot * x * 2.0 + shift;
//         a *= 0.5;
//     }
//     return v;
// }

// mat2 rotation2d(float angle) {
//     float s = sin(angle);
//     float c = cos(angle);

//     return mat2(
//         c, -s,
//         s, c
//     );
// }

// vec3 hsv2rgb(vec3 c)
// {
//     vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
//     vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
//     return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
// }
// `

// const frag = `

// #ifdef GL_ES
// precision highp float;
// #endif

// uniform float u_time;
// uniform vec2 u_resolution;
// uniform vec2 u_mouse;
// uniform float seed;
// uniform float p;

// varying vec2 v_texcoord;

// ${includes}

// void main(void)
// {
//     vec2 uv = v_texcoord;

// 		// find the distance between the mouse and points
// 		vec2 mouse = u_mouse / u_resolution;
// 		float dist = distance(uv, mouse);
// 		float strength = smoothstep(0.5, 0.0, dist);
    
//     // where does the hue start
//     float hue = seed;
    
//     // make two hsv colors
//     vec3 hsv1 = vec3(hue,        0.9,  0.85);
//     vec3 hsv2 = vec3(hue + 0.07, 0.85, 0.75);
    
//     // convert them to RGB
//     vec3 rgb1 = hsv2rgb(hsv1);
//     vec3 rgb2 = hsv2rgb(hsv2);
    
//     // colors in RGBA
//     vec4 color1 = vec4(rgb1, 1);
//     vec4 color2 = vec4(rgb2, 1);
    
//     // add some grain
//     float grain = rand(100.0 * uv) * mix(0.2, 0.01, strength);
    
//     // make movement for fbm
//     vec2 movement = vec2(u_time * 0.01, u_time * -0.01);
//     movement *= rotation2d(u_time * 0.005);
    
//     // make a noise pattern
//     float f = fbm(uv + movement + seed);  
//     f *= 10.0;
//     f += grain;
//     f += u_time * 0.2;
//     f = fract(f);
    
//     // mix colors based on noise pattern
// 		float gap = mix(0.5, 0.01, strength);
//     float mixer = smoothstep(0.0, gap, f) - smoothstep(1.0 - gap, 1.0, f);
 
//     // final pixel color is...
//     vec4 color = mix(color1, color2, mixer);
    
//     gl_FragColor = color;
// }
// `