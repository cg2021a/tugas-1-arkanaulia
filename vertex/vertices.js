function make_bevel(degree, px = 0, py = 0 , radius = 1, start_degree = 0){
    let points = []

    for(let i = 0; i <= degree; i++){
        let j = (i + start_degree) * Math.PI / 180;
        let k = (i + start_degree + 1) * Math.PI / 180;
    
        let vert1 = [
            Math.sin(j) * radius + px, Math.cos(j) * radius + py
        ]
    
        let vert2 = [
            px, py
        ]
        let vert3 = [
            Math.sin(k) * radius + px, Math.cos(k) * radius + py
        ]
    
        points = points.concat(vert1);
        points = points.concat(vert2);
        points = points.concat(vert3);
    }

    return points;
}

let bevel1 = make_bevel(100, 0.354, -0.214, 0.045, 100)
let bevel2 = make_bevel(100, -0.383, -0.225, 0.05, 160)
let bevel3 = make_bevel(120, 0.343, -0.263, 0.04, 80)
let bevel4 = make_bevel(100, -0.219, -0.235, 0.05, 160)

let n=1.5

let k1_alas = [
    //alas
    -0.36*n,  0,  
    -0.275*n,  -0.18*n, 
    0.35*n, 0, 
    0.35*n, 0,   
    0.25*n, -0.17*n,
    -0.275*n,  -0.18*n,
];

let k1_atas = [
    //atas
    -0.4*n,  0,
    -0.37*n,  -0.025*n,
    0.4*n, 0,
    0.4*n, 0,
    0.365*n, -0.03*n,
    -0.37*n,  -0.025*n,
];

let k1_layar = [
    //layar
    -0.4*n,  0,
    0.22*n,  0.14*n,
    0.4*n, 0,
    -0.4*n,  0,
    0.22*n,  0.14*n,
    -0.3*n,  0.15*n,
];


let k1_keycaps = [
    //key1
    -0.36*n,  0.018*n,  
    0.208*n,  0.13*n,  
    0.35*n, 0.015*n, 
    -0.36*n,  0.018*n,  
    0.208*n,  0.13*n, 
    -0.285*n,  0.14*n,
];

let m=1.4

let k2_atas = [
    //atas
    -0.38,  0,  
    -0.25,  -0.28, 
    0.45, 0, 
    0.45, 0,    
    0.369, -0.30,
    -0.25,  -0.28, 
];

let k2_alas = [
    //alas
    -0.45,  0,  
    -0.5,  0.05, 
    0.46, 0, 
    0.45, 0,    
    -0.5,  0.05,
    0.5,  0.05,

    //AA
    0.5,  0.05,
    0.482, 0.33,
    0.5, 0.3
];

let k2_shading = [
     //atas
     -0.5,  0.05, 
     0.5,  0.05, 
     -0.05,  0.295,
     0.5,  0.05, 
     -0.05,  0.295,
     0.482, 0.33, 
];

let k2_layar = [
    //layar
    0.45,  0.3,  
    0.46,  0.08, 
    -0.39, 0.075, 
    -0.39, 0.075,  
    0.45,  0.3, 
    -0.04,  0.27, 
];
