import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/textures/NormalMap.png')

// Debug controls
const gui = new dat.GUI()

// Canvas hooks into HTML 
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects ( shape of object )
const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)

// Materials ( skin of object )
const material = new THREE.MeshStandardMaterial()
// Changing material settings
material.metalness = 0.7
material.roughness = 0.2
// texture loader (when you have alot of assets you can use loader)
material.normalMap = normalTexture
material.color = new THREE.Color(0x292929)

// Mesh ties both shape and skin
const sphere = new THREE.Mesh(geometry,material)
// Adds to scene
scene.add(sphere)

// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// Color light
const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(-1.9,1,-.22)
pointLight2.intensity = 4.36
scene.add(pointLight2)

// Makes a folder for gui tools
const redLight = gui.addFolder('Red Light')

// Moving red light 
redLight.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
redLight.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
redLight.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
redLight.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

// Red light helper
// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper)

// Blue Light
const pointLight3 = new THREE.PointLight(0x2dff, 2)
pointLight3.position.set(.94,-.86,-.22)
pointLight3.intensity = 4.36
scene.add(pointLight3)

// Makes a folder for gui tools
const blueLight = gui.addFolder('Blue Light')
// Moving red light 
blueLight.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
blueLight.add(pointLight3.position, 'x').min(-6).max(6).step(0.01)
blueLight.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
blueLight.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

// Obj to access color property
const blueLightColor = {
    color: 0xff0000 
}
// Color Pallete
blueLight.addColor(blueLightColor, 'color')
// When you click a color it updates
.onChange(() => {
    pointLight3.color.set(blueLightColor.color)
})

// Blue light helper
// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelper2)

/**
 * Screen Size
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
// Notifys Three js when window resizes
window.addEventListener('resize', () =>
{
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    // makes background transparent
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onMouseMovement)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onMouseMovement(e) {
    mouseX = (e.clientX - windowHalfX)
    mouseY = (e.clientY - windowHalfY)
}

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .5 * (targetY - sphere.rotation.x)
    sphere.rotation.z += -.05 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()