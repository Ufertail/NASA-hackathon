const buttons = document.querySelectorAll(".buttons")
const menuButton = document.querySelector(".menu-button")
const sideBar = document.querySelector(".sidebar")
const message = document.querySelector(".passiveMessage")




let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
let renderer = new THREE.WebGLRenderer()

scene.background = new THREE.Color(0xb8cdd1)

renderer.setSize(window.innerWidth, window.innerHeight)

document.getElementById("scene").appendChild(renderer.domElement)
camera.position.set(0, 2, 5)

menuButton.addEventListener("click", (e) =>{
    model.position.set(-2.5, 0, 0)
    message.classList.add("activeMessage")
})

sideBar.addEventListener("click", (e) =>{
    model.position.set(0, 0, 0)
    message.classList.remove("activeMessage")
})

buttons.forEach((ele) => {
    ele.addEventListener("click", (e) => {
        console.log(e.target)
        message.classList.add("activeMessage")
        
    })
})



let loader = new THREE.GLTFLoader()
let model
loader.load("scene.gltf", function(gltf){
    model = gltf.scene
    
    
    scene.add(model)
})

let ambient = new THREE.AmbientLight(0xffffff, 2)
scene.add(ambient)

let controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.enablePan = false
controls.enableZoom = false
controls.enableDamping = false
controls.dampingFactor = 0.07



function render(){
    renderer.render(scene, camera)
    requestAnimationFrame(render)
    controls.update()

    model.rotation.y += 0.001;
    
        
}

render()


