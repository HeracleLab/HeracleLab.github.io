import define1 from "./8d271c22db968ab0@160.js";

function _1(md){return(
md`# Atlante digitale 3D del cervello`
)}

function _selectAtlas(Inputs,atlasTable){return(
Inputs.select(
  atlasTable.filter((e) => e.name[0] != '-').map((e) => e.name.slice(0,-2)),
  { label: "Seleziona area:", unique: true, multiple: true, sort: "ascending"})
)}

function _colorsForm(selectAtlas)
{
  let formString = selectAtlas.map((x) => ('<label>' + x + ':&emsp;<input type="color" name="' + x + '_color" value="#FF0000"></label>')).join('<br/>');

  return '<form>' + formString + '</form>';
}


function _atlasColor(form,html,colorsForm){return(
form(html`${colorsForm}`)
)}

function _checkboxes(Inputs){return(
Inputs.checkbox(
  [
    "Mostra Box"
  , "Mostra Emisfero DX"
  , "Mostra Emisfero SX"
//, "Animation"
  ], {
  label: "Opzioni",
  value: [
    "Mostra Emisfero DX"
  , "Mostra Emisfero SX"
  ]
})
)}

function _atlasH2(selectAtlas,atlasColor)
{
  let h2String = selectAtlas.map((x) => ('<span style="color: ' + atlasColor[x + '_color'] +'">' + x + '</span>')).join(' - ');
  
  return '<h2>' + h2String + '</h2>';
}


function _atlasTitle(html,atlasH2){return(
html`${atlasH2}`
)}

function _8(htl){return(
htl.html`<div id='webgl'>
</div>`
)}

function _9(renderer){return(
renderer.domElement
)}

function _10(md){return(
md`Based on the preliminary work by Chuncheng Zhang, PhD
(chuncheng.zhang@ia.ac.cn)`
)}

async function _gltfExport(atlas,brain,THREE,DOM,keyword)
{
  const data = atlas.concat(brain);
  const exporter = new THREE.GLTFExporter();
  const gltf = await new Promise(resolve =>
    exporter.parse(data, resolve, {
      binary: false,
      truncateDrawRange: false
    })
  );
  const blob = new Blob([JSON.stringify(gltf)], { type: 'model/gltf+json' });
  
  return DOM.download(blob, keyword + '.gltf', 'Salva Modello GLTF');
}


async function _glbExport(atlas,THREE,DOM,keyword)
{
  const data = atlas;//.concat(brain);
  const exporter = new THREE.GLTFExporter();
  const glb = await new Promise(resolve =>
    exporter.parse(data, resolve, {
      binary: true,
      truncateDrawRange: false
    })
  );
  const blob = new Blob([glb], { type: 'model/gltf-binary' });
  return DOM.download(blob, keyword + '.glb', 'Salva Modello GLB');
}


function _13(htl){return(
htl.html`<style type="text/css">
.observablehq--inspect{display:none!important;}
</style>`
)}

function _14(Event,URLSearchParams,$0)
{
  function set(input, value) {
    input.value = value;
    input.dispatchEvent(new Event("input", {bubbles: true}));
  }
  
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const setAtlas = urlParams.get('setAtlas');
  if (setAtlas) {
    set($0, setAtlas.split('-'));

    const css = 'h1, p, form, label, button, input, output, select {display: none !important;} canvas { position: fixed; inset: 0 0 0 0; z-index: 10; } h2 { position: fixed; top: 10px; left: 10px; z-index: 11; }';
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');

    head.appendChild(style);
    
    style.type = 'text/css';
    if (style.styleSheet){
      // This is required for IE8 and below.
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }
}


function _options(checkboxes)
{
  const toggleHelpers = checkboxes.includes("Mostra Box");
  const toggleR = checkboxes.includes("Mostra Emisfero DX");
  const toggleL = checkboxes.includes("Mostra Emisfero SX");
//const toggleAnimation = checkboxes.includes("Animation");
  
  return {
    toggleR
  , toggleL
  , toggleHelpers
//, toggleAnimation
  };
}


function _keyword(selectAtlas)
{
  let keyword = selectAtlas.length > 0 ? selectAtlas : ['brain']
  keyword = keyword.join("_").replaceAll(" ", "-").toLowerCase();
  console.log(keyword);
  return keyword;
}


function _17(renderer,scene,camera)
{
  requestAnimationFrame(() => renderer.render(scene, camera));
}


function _cube(THREE)
{
  const material = new THREE.MeshNormalMaterial();
  const geometry = new THREE.BoxGeometry(10, 10, 10);
  const cube = new THREE.Mesh(geometry, material);
  
  cube.position.y = 0;
  cube.position.x = 100;
  cube.position.z = 100;
  
  return cube;
}


function _spheres(atlasTable,THREE)
{
  const table = atlasTable;
  const material = new THREE.MeshNormalMaterial();
  const mkSphere = (e) => {
    const { x, y, z } = e;
    const geometry = new THREE.SphereGeometry(1);
    geometry.translate(-45, -50 * 0, -45);
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = parseInt(x);
    sphere.position.y = parseInt(z);
    sphere.position.z = parseInt(y);
    return sphere;
  };
  const spheres = table.map(mkSphere);
  const group = new THREE.Group();

  spheres.map((e) => group.add(e));

  return group;
}


function _20()
{
//scene.add(spheres);
//scene.add(cube);
}


function _brainGeometry(mkVertices,brainModel,mkGeometry)
{
  const vertices = mkVertices(brainModel);
  const geometry = mkGeometry(vertices);

  geometry.translate(-45, -50 * 0, -45);
  
  return geometry;
}


function _brain(THREE,brainGeometry)
{
  const material = new THREE.MeshPhongMaterial({
    color: "hsl(0,100%,100%)",
    opacity: 0.3,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const mesh = new THREE.Mesh(brainGeometry, material);

  return mesh;
}


function _helpBrain(THREE,brain)
{
  const help = new THREE.BoxHelper(brain);
  return help;
}


function _atlasGeometries(atlasModels,mkVertices,mkGeometry)
{
  const geometry = new Array();
  
  for (const atlasModel of atlasModels) {
    const vertices = mkVertices(atlasModel);
    const _geometry = mkGeometry(vertices);
    _geometry.name = atlasModel.name;
    
    _geometry.translate(-45, -50 * 0, -45);
    geometry.push(_geometry);
  }
  
  return geometry;
}


function _atlas(atlasGeometries,THREE,atlasColor,brain)
{
  const mesh = new Array();
  
  for (const atlasGeometry of atlasGeometries) {
    const material = new THREE.MeshPhongMaterial({
      color: atlasColor[atlasGeometry.name + "_color"],
      opacity: 0.3,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    
    const _mesh = new THREE.Mesh(atlasGeometry, material);
    _mesh.rotation.y = brain.rotation.y;

    mesh.push(_mesh);
  }

  return mesh;
}


function _helpAtlas(atlas,THREE)
{
  const help = new Array();
  
  for (const i in atlas) {
    const _help = new THREE.BoxHelper(atlas[i]);
    help.push(_help);
  }
  
  return help;
}


function _27(scene,brain,atlas,options,helpBrain,helpAtlas)
{
  scene.add(brain);
  for (const i in atlas) {
    scene.add(atlas[i]);
  }

  if (options.toggleHelpers) {
    scene.add(helpBrain);
    for (const i in helpAtlas) {
      scene.add(helpAtlas[i]);
    }
  }
}


function _28(THREE,scene,options)
{
  let color = 0xffffff;
  const intensity = 1;
  const light = new THREE.AmbientLight(color, intensity);
  scene.add(light);

  color = 0x00ff00;
  const light1 = new THREE.SpotLight(color);
  light1.position.y = 100;
  scene.add(light1);

  if (options.toggleHelpers) {
    const helper1 = new THREE.SpotLightHelper(light1);
    scene.add(helper1);
  }
}


function _29(THREE,scene)
{
  // GRID HELPER
  var size = 200;
  var divisions = 8;
  const helper = new THREE.GridHelper(size, divisions);
  // helper.position.y = -70;
  scene.add(helper);
}


function _scene(atlasColor,checkboxes,selectAtlas,THREE)
{
  atlasColor;
  checkboxes;
  selectAtlas;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x001b42);
  return scene;
}


function _height(width){return(
window.location.href.indexOf("setAtlas") == -1 ? width/2 : window.innerHeight
)}

function _camera(width,height,THREE)
{
  const fov = 45;
  const aspect = width / height;
  const near = 1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  
  camera.position.set(150, 200, -150);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  
  return camera;
}


function _renderer(THREE,width,height,camera,scene,invalidation)
{
  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(width, height);
  renderer.setPixelRatio(devicePixelRatio);
  
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", () => renderer.render(scene, camera));
  invalidation.then(() => (controls.dispose(), renderer.dispose()));
  
  return renderer;
}


function _brainModel(mkBrainModel){return(
mkBrainModel()
)}

function _atlasModels(mkSelectAtlasModels){return(
mkSelectAtlasModels()
)}

function _mkGeometry(THREE){return(
(vertices) => {
  const positions = [];
  const normals = [];
  const uvs = [];
  for (const vertex of vertices) {
    positions.push(...vertex.pos);
    normals.push(...vertex.norm);
    uvs.push(...vertex.uv);
  }

  const geometry = new THREE.BufferGeometry();
  const positionNumComponents = 3;
  const normalNumComponents = 3;
  const uvNumComponents = 2;
  const positionAttr = new THREE.BufferAttribute(
    new Float32Array(positions),
    positionNumComponents
  );
  const normalAttr = new THREE.BufferAttribute(
    new Float32Array(normals),
    normalNumComponents
  );
  const uvAttr = new THREE.BufferAttribute(
    new Float32Array(uvs),
    uvNumComponents
  );

  geometry.setAttribute("position", positionAttr);
  geometry.setAttribute("normal", normalAttr);
  geometry.setAttribute("uv", uvAttr);

  return geometry;
}
)}

function _mkVertices(normals){return(
(meshModel) => {
  const { positions, cells } = meshModel;
  const norms = normals(cells, positions);

  const vertices = [];

  const uv3 = [
    [0, 0],
    [0, 1],
    [1, 0]
  ];

  let pos, norm, uv;
  for (const cell of cells) {
    // vertices.push(cell);
    for (let i = 0; i < 3; i++) {
      pos = positions[cell[i]];
      norm = norms[cell[i]];
      uv = uv3[i];
      vertices.push({ pos, norm, uv });
    }
  }

  return vertices;
}
)}

function _getAtlasModels(options,atlasTable,rawCellsAll,rawVerticesAll){return(
function getAtlasModels(atlasNames) {
  const atlasModels = new Array();
  const atlasNameSuffix = (options.toggleL ^ options.toggleR) ? (options.toggleL ? " L" : " R") : (options.toggleL ? "" : "_");

  for (const atlasName of atlasNames) {
    const atlas = atlasTable.filter((e) => e.name.startsWith(atlasName + atlasNameSuffix));
    const values = atlas.map(x => x.idx);
    
    for (const i in values) {
      const _cells = rawCellsAll.filter((e) => e.idx == values[i]);
      const _vertices = rawVerticesAll.filter((e) => e.idx == values[i]);
      
      const cells = _cells.map((e) => [
        parseInt(e.v2),
        parseInt(e.v1),
        parseInt(e.v0)
      ]);
  
      const positions = _vertices.map((e) => [
        parseFloat(e.z),
        parseFloat(e.x),
        parseFloat(e.y)
      ]);
  
      const colors = _cells.map((e) => [0.8, 0.2, 0.2, 0.5]);
      atlasModels.push({ cells, positions, colors, name: atlasName });
    }
  }
  
  return atlasModels;
}
)}

function _mkSelectAtlasModels(getAtlasModels,selectAtlas){return(
() => {
  let atlasModelsData = getAtlasModels(selectAtlas);
  return atlasModelsData;
}
)}

function _mkBrainModel(rawCells0,rawVertices0,bunny){return(
() => {
  const _cells = rawCells0;
  const _vertices = rawVertices0;

  const cells = _cells.map((e) => [
    parseInt(e.v2),
    parseInt(e.v1),
    parseInt(e.v0)
  ]);

  const positions = _vertices.map((e) => [
    parseFloat(e.z),
    parseFloat(e.x),
    parseFloat(e.y)
  ]);

  const colors = _cells.map((e) => [0.4, 0.4, 0.4, 0.5]);

  return { cells, positions, colors };

  return bunny;
}
)}

async function _normals(){return(
(await import("https://cdn.skypack.dev/angle-normals@1.0.0")).default
)}

async function _THREE(require)
{
  const THREE = (window.THREE = await require("three@0.130.0/build/three.min.js"));
  await require("three@0.130.0/examples/js/controls/OrbitControls.js").catch(() => {});
  await require("three@0.130.0/examples/js/libs/stats.min.js").catch(() => {});
  await require("three@0.130.0/examples/js/exporters/GLTFExporter.js").catch(() => {});
  return THREE;
}


async function _bunny(){return(
(await import("https://cdn.skypack.dev/bunny@1.0.1")).default
)}

async function _atlasTable(FileAttachment){return(
await FileAttachment("atlas_table_selected-2.csv").csv()
)}

async function _rawCellsAll(FileAttachment){return(
await FileAttachment("cells-all.csv").csv()
)}

async function _rawVerticesAll(FileAttachment){return(
await FileAttachment("vertices-all.csv").csv()
)}

async function _rawCells0(FileAttachment){return(
await FileAttachment("cells-0-1.csv").csv()
)}

async function _rawVertices0(FileAttachment){return(
await FileAttachment("vertices-0-1.csv").csv()
)}

function _atlas_table_selected2(__query,FileAttachment,invalidation){return(
__query(FileAttachment("atlas_table_selected-2.csv"),{from:{table:"atlas_table_selected"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["cells-0-1.csv", {url: new URL("./files/a48867aeb06dabedfe73ba68b8ef84df2dd97f555d1b1168ece20b3e232dbea10c6adc34eb97a03e44d1d3ef6960b8ee589157974f408b1d8de917aa6c1cf3e3.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["vertices-0-1.csv", {url: new URL("./files/bd6238e71b5efa10e74ed3c50c7de1008a5617fe5dfeb8b044780f433295d7dc866c8397f2846bb73a2cde86e726e1d904c06c095557c4d4b0627e880916461c.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["cells-all.csv", {url: new URL("./files/1a5c65c2383d3372fea165664252f61a7e499d05bb91c9d0b8259952d9037707a87c1e5f3707710a194fabe44cdf5a3cf202b4d3926c046670ef438b179a17aa.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["vertices-all.csv", {url: new URL("./files/c5459e39d9649696c72069293539480b9ace7ac27295d63d44ea001c3fb3684520c7fcfd6ba68d57cc0660b475f3b7345169cc51acc1b57091f4c461149d0bdd.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["atlas_table_selected-2.csv", {url: new URL("./files/37b7f3b2a1d6031c0a4a425cfc0e30ea51d72a833c197ae1d183bbf3dc569cbe70c76ded44fd207af579cb74d465af4312fb1b0dda11ed3f084515a58de36039.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof selectAtlas")).define("viewof selectAtlas", ["Inputs","atlasTable"], _selectAtlas);
  main.variable(observer("selectAtlas")).define("selectAtlas", ["Generators", "viewof selectAtlas"], (G, _) => G.input(_));
  main.variable(observer("colorsForm")).define("colorsForm", ["selectAtlas"], _colorsForm);
  main.variable(observer("viewof atlasColor")).define("viewof atlasColor", ["form","html","colorsForm"], _atlasColor);
  main.variable(observer("atlasColor")).define("atlasColor", ["Generators", "viewof atlasColor"], (G, _) => G.input(_));
  main.variable(observer("viewof checkboxes")).define("viewof checkboxes", ["Inputs"], _checkboxes);
  main.variable(observer("checkboxes")).define("checkboxes", ["Generators", "viewof checkboxes"], (G, _) => G.input(_));
  main.variable(observer("atlasH2")).define("atlasH2", ["selectAtlas","atlasColor"], _atlasH2);
  main.variable(observer("viewof atlasTitle")).define("viewof atlasTitle", ["html","atlasH2"], _atlasTitle);
  main.variable(observer("atlasTitle")).define("atlasTitle", ["Generators", "viewof atlasTitle"], (G, _) => G.input(_));
  main.variable(observer()).define(["htl"], _8);
  main.variable(observer()).define(["renderer"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("gltfExport")).define("gltfExport", ["atlas","brain","THREE","DOM","keyword"], _gltfExport);
  main.variable(observer("glbExport")).define("glbExport", ["atlas","THREE","DOM","keyword"], _glbExport);
  main.variable(observer()).define(["htl"], _13);
  main.variable(observer()).define(["Event","URLSearchParams","viewof selectAtlas"], _14);
  main.variable(observer("options")).define("options", ["checkboxes"], _options);
  main.variable(observer("keyword")).define("keyword", ["selectAtlas"], _keyword);
  main.variable(observer()).define(["renderer","scene","camera"], _17);
  main.variable(observer("cube")).define("cube", ["THREE"], _cube);
  main.variable(observer("spheres")).define("spheres", ["atlasTable","THREE"], _spheres);
  main.variable(observer()).define(_20);
  main.variable(observer("brainGeometry")).define("brainGeometry", ["mkVertices","brainModel","mkGeometry"], _brainGeometry);
  main.variable(observer("brain")).define("brain", ["THREE","brainGeometry"], _brain);
  main.variable(observer("helpBrain")).define("helpBrain", ["THREE","brain"], _helpBrain);
  main.variable(observer("atlasGeometries")).define("atlasGeometries", ["atlasModels","mkVertices","mkGeometry"], _atlasGeometries);
  main.variable(observer("atlas")).define("atlas", ["atlasGeometries","THREE","atlasColor","brain"], _atlas);
  main.variable(observer("helpAtlas")).define("helpAtlas", ["atlas","THREE"], _helpAtlas);
  main.variable(observer()).define(["scene","brain","atlas","options","helpBrain","helpAtlas"], _27);
  main.variable(observer()).define(["THREE","scene","options"], _28);
  main.variable(observer()).define(["THREE","scene"], _29);
  main.variable(observer("scene")).define("scene", ["atlasColor","checkboxes","selectAtlas","THREE"], _scene);
  main.variable(observer("height")).define("height", ["width"], _height);
  main.variable(observer("camera")).define("camera", ["width","height","THREE"], _camera);
  main.variable(observer("renderer")).define("renderer", ["THREE","width","height","camera","scene","invalidation"], _renderer);
  main.variable(observer("brainModel")).define("brainModel", ["mkBrainModel"], _brainModel);
  main.variable(observer("atlasModels")).define("atlasModels", ["mkSelectAtlasModels"], _atlasModels);
  main.variable(observer("mkGeometry")).define("mkGeometry", ["THREE"], _mkGeometry);
  main.variable(observer("mkVertices")).define("mkVertices", ["normals"], _mkVertices);
  main.variable(observer("getAtlasModels")).define("getAtlasModels", ["options","atlasTable","rawCellsAll","rawVerticesAll"], _getAtlasModels);
  main.variable(observer("mkSelectAtlasModels")).define("mkSelectAtlasModels", ["getAtlasModels","selectAtlas"], _mkSelectAtlasModels);
  main.variable(observer("mkBrainModel")).define("mkBrainModel", ["rawCells0","rawVertices0","bunny"], _mkBrainModel);
  main.variable(observer("normals")).define("normals", _normals);
  main.variable(observer("THREE")).define("THREE", ["require"], _THREE);
  main.variable(observer("bunny")).define("bunny", _bunny);
  main.variable(observer("atlasTable")).define("atlasTable", ["FileAttachment"], _atlasTable);
  main.variable(observer("rawCellsAll")).define("rawCellsAll", ["FileAttachment"], _rawCellsAll);
  main.variable(observer("rawVerticesAll")).define("rawVerticesAll", ["FileAttachment"], _rawVerticesAll);
  main.variable(observer("rawCells0")).define("rawCells0", ["FileAttachment"], _rawCells0);
  main.variable(observer("rawVertices0")).define("rawVertices0", ["FileAttachment"], _rawVertices0);
  const child1 = runtime.module(define1);
  main.import("form", child1);
  main.variable(observer("atlas_table_selected2")).define("atlas_table_selected2", ["__query","FileAttachment","invalidation"], _atlas_table_selected2);
  return main;
}
