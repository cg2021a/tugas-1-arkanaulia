///<reference types="three" />

function main() {
    // Canvas
    const canvas = document.querySelector('#myCanvas')

    // Scene
    const scene = new THREE.Scene()

    // Objects
    const geo1 = new THREE.TorusGeometry(1.5, .2, 20, 100);
    const geo2 = new THREE.BoxGeometry(1, 1, 1)
    const geo3 = new THREE.ConeGeometry(0.5, 1, 200)
    const geo4 = new THREE.SphereBufferGeometry(0.5, 24)
    const geo5 = new THREE.CylinderBufferGeometry(4,6,.7, 32)
    const geo6 = new THREE.TorusKnotGeometry( .3, .1, 100, 16 );
    const geo7 = new THREE.DodecahedronBufferGeometry(.7)


    // Materials
    const m1 = new THREE.MeshBasicMaterial()
    m1.color = new THREE.Color(0xff0000)

    const m2 = new THREE.MeshStandardMaterial({
        color: 0xffcc88,
        metalness: 1,
        roughness: 0.3,
        flatShading: false
        
    })

    const m3 = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        wireframe:true,
        emissive: 0xffffff,
        emissiveIntensity:10
    })

    const m4 = new THREE.MeshToonMaterial({
        color:0x49ef4

    })

    const m5 = new THREE.MeshPhysicalMaterial({
        color: 0x00ff61,
        roughness: 0.9,
        metalness:.5
    })

    const m6 = new THREE.MeshLambertMaterial({
        color: 'red'
    })

    const normalMaterial = new THREE.MeshNormalMaterial({
        flatShading: true,
        wireframe: false
    })
    const torusknot = new THREE.Mesh(geo6, normalMaterial)
    scene.add(torusknot)

    
    

    // Mesh
    const sphere = new THREE.Mesh(geo2, m6)
    scene.add(sphere)
    const torus = new THREE.Mesh(geo1, m2)
    scene.add(torus)
    const cone = new THREE.Mesh(geo3, m4)
    scene.add(cone)
    const bulet = new THREE.Mesh(geo4, m3)
    scene.add(bulet)
    const silinder = new THREE.Mesh(geo5, m5)
    scene.add(silinder)
    
    const dode = new THREE.Mesh(geo7, m7)
    scene.add(dode)

    //position
    bulet.position.y = 2.5

    cone.position.x = 4
    cone.position.y = 2

    silinder.position.y = -2

    torusknot.position.x =-4
    torusknot.position.y =2

    dode.position.z = 3


    // Lights

    var light = new THREE.DirectionalLight(0xffffff, 3)
    light.position.x = 8
    light.position.y = .7
    light.position.z = 8
    scene.add(light)

    document.getElementById("light1").addEventListener("click", function() {
        scene.remove(light);
        light.position.set(1, -2, -4);
        light = new THREE.AmbientLight(0xffffff, 1);
        scene.add(light);
      });
      
      document.getElementById("light2").addEventListener("click", function() {
        scene.remove(light);
        light.position.set(1, -2, -4);
        light = new THREE.HemisphereLight(0xffffff, 1);
        scene.add(light);
      });
    
      document.getElementById("light3").addEventListener("click", function() {
        scene.remove(light);
        light.position.set(1, -2, -4);
        light = new THREE.DirectionalLight(0xffffff, 1);
        scene.add(light);
      });
    
      document.getElementById("light4").addEventListener("click", function() {
        scene.remove(light);
        light.position.set(1, -2, -4);
        light = new THREE.PointLight(0xffffff, 1);
        scene.add(light);
      });
    
      document.getElementById("light5").addEventListener("click", function() {
        scene.remove(light);
        light.position.set(1, -2, -4);
        light = new THREE.SpotLight(0xffffff, 1);
        scene.add(light);
      });
      


    // Camera
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.x = 5
    camera.position.y = 1
    camera.position.z = 9
    camera.rotation.x = -0.2
    camera.rotation.y = .5
    camera.rotation.z = .1
    scene.add(camera)

    // Controls
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true
    })

    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.75;


    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


    const clock = new THREE.Clock()
    let speed = 0.01;
    let speed2 = 0.01;
    let speed3 = 0.01;
    const tick = () => {
        const elapsedTime = clock.getElapsedTime()
        sphere.rotation.x = .5 * elapsedTime
        torus.rotation.y = .5 * elapsedTime
        cone.rotation.z = .5 * elapsedTime
        cone.rotation.y = .5 * elapsedTime
        silinder.rotation.y = 1*elapsedTime
        torusknot.rotation.z = 3*elapsedTime
        torusknot.rotation.x = 3*elapsedTime
        if (sphere.position.x >= 5 || sphere.position.x <= -5) speed = -speed;
        sphere.position.x += speed;
        if (dode.position.z >= 2 || dode.position.z <= -5) speed3 = -speed3
        dode.position.z += speed;
        dode.rotation.x = .8*elapsedTime
        dode.rotation.y = .8*elapsedTime
        if (bulet.position.y >= 4 || sphere.position.x <= 3.5) speed2 = -speed2;
        bulet.position.y += speed2;
        bulet.rotation.y = 2*elapsedTime
        
        renderer.render(scene, camera)

        window.requestAnimationFrame(tick)
    }

    tick()
    
}

main();