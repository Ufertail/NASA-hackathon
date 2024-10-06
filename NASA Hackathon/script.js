const buttons = document.querySelectorAll(".buttons")
const menuButton = document.querySelector(".menu-button")
const sideBar = document.querySelector(".sidebar")
const message = document.getElementById("myChart")




let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
let renderer = new THREE.WebGLRenderer()

scene.background = new THREE.Color(0xb8cdd1)

renderer.setSize(window.innerWidth, window.innerHeight)

document.getElementById("scene").appendChild(renderer.domElement)
camera.position.set(0, 2, 5)

if (menuButton) {
    menuButton.addEventListener("click", (e) => {
        model.position.set(-2.5, 0, 0);
        if (message) message.classList.add("canvasIsActive");
    });
}

if (sideBar) {
    sideBar.addEventListener("click", (e) => {
        model.position.set(0, 0, 0);
        if (message) message.classList.remove("canvasIsActive");
    });
}


buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        console.log(e.target);  // Логируем, на какую кнопку нажали
        
        // Двигаем модель (замените координаты по вашему желанию)
        model.position.set(-2.5, 0, 0);
        
        // Если элемент message существует, добавляем класс "canvasIsActive"
        canvas(e.target.val, e.target.innerHTML)
    });
});




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


function canvas(link, name){
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = link;

    const fetchUrl = proxyUrl + apiUrl;

    async function fetchDataAndCreateChart() {
        try {
            const response = await fetch(fetchUrl);

            if (!response.ok) {
                new Error('Ошибка сети: ' + response.status);
            }

            const data = await response.json();

            const chartData = data.map(item => ({
                x: new Date(item.date),
                y: item.value
            }));

            const ctx = document.getElementById('myChart').getContext('2d');

            const myChart = new Chart(ctx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: name,
                        data: chartData,
                        backgroundColor: 'rgba(255, 255, 255, 255)',
                        borderColor: 'rgba(128, 0, 128, 1)',
                        borderWidth: 3,
                        fill: false,
                        tension: 0.1,
                        showLine: false,
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'month',
                                displayFormats: {
                                    month: 'LLLL yyyy'
                                },
                                tooltipFormat: 'LLLL yyyy'
                            },
                            adapters: {
                                date: {
                                    locale: 'en'
                                }
                            },
                            display: true,
                            title: {
                                display: true,
                                text: 'Observation Date/Time'
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                //todo: изменить текст
                                text: 'TODO Значение'
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    fetchDataAndCreateChart();
}