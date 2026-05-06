import './style.css'

function getByIdOrThrow<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id) as T | null
  if (!el) {
    throw new Error(`Element with id not found: ${id}`)
  }
  return el
}

interface ChessPiece {
  id: string
  symbol: string
  name: string
}

const CHESS_PIECES: ChessPiece[] = [
  { id: 'pawn', symbol: '♟', name: 'Pawn - Pion' },
  { id: 'rook', symbol: '♜', name: 'Rook - Benteng' },
  { id: 'knight', symbol: '♞', name: 'Knight - Kuda' },
  { id: 'bishop', symbol: '♝', name: 'Bishop - Gajah' },
  { id: 'queen', symbol: '♛', name: 'Queen - Ratu' },
  { id: 'king', symbol: '♚', name: 'King - Raja' },
]

let currentPiece = 'pawn'
let isMarkerVisible = false
let arStarted = false

const app = getByIdOrThrow<HTMLDivElement>('app')

app.innerHTML = `
  <div class="loading-screen" id="loading">
    <div class="spinner"></div>
    <p class="loading-text">Memuat Kamera AR...</p>
    <p class="loading-subtext">Pastikan memberikan izin akses kamera</p>
    <button id="start-ar-btn" class="start-ar-btn">Mulai AR</button>
    <p id="ar-error" class="ar-error"></p>
  </div>

  <a-scene
    embedded
    vr-mode-ui="enabled: false"
    device-orientation-permission-ui="enabled: false"
    renderer="logarithmicDepth: true; antialias: true; colorManagement: true; sortObjects: true;"
    arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
  >
    <a-marker preset="hiro" id="main-marker" emitevents="true">
      <a-entity id="chess-piece-entity" class="fade-in" animation="property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear">
        <a-cone
          position="0 0.4 0"
          radius-bottom="0.25"
          radius-top="0.05"
          height="0.7"
          color="#E03E3E"
          material="metalness: 0.3; roughness: 0.7"
        ></a-cone>
      </a-entity>
    </a-marker>

    <a-entity camera></a-entity>
  </a-scene>

  <div class="overlay-ui">
    <div class="app-header">
      <h1 class="app-title">♟ ChessAR</h1>
    </div>

    <div class="camera-status" id="camera-status">
      <span class="status-dot" id="status-dot"></span>
      <span id="status-text">Memuat...</span>
    </div>

    <div class="piece-info" id="piece-info">
      Pawn - Pion
    </div>

    <div class="instructions" id="instructions">
      Scan marker <strong>Hiro</strong> untuk menampilkan bidak catur 3D
    </div>

    <div class="piece-selector" id="piece-selector">
      ${CHESS_PIECES.map(piece => `
        <button
          class="piece-btn ${piece.id === currentPiece ? 'active' : ''}"
          data-piece="${piece.id}"
          title="${piece.name}"
        >
          ${piece.symbol}
        </button>
      `).join('')}
    </div>
  </div>
`

const loadingEl = getByIdOrThrow<HTMLDivElement>('loading')
const pieceInfoEl = getByIdOrThrow<HTMLDivElement>('piece-info')
const pieceSelector = getByIdOrThrow<HTMLDivElement>('piece-selector')
const statusDot = getByIdOrThrow<HTMLSpanElement>('status-dot')
const statusText = getByIdOrThrow<HTMLSpanElement>('status-text')
const instructionsEl = getByIdOrThrow<HTMLDivElement>('instructions')
const chessPieceEntity = getByIdOrThrow<HTMLElement>('chess-piece-entity')
const startArBtn = getByIdOrThrow<HTMLButtonElement>('start-ar-btn')
const arErrorEl = getByIdOrThrow<HTMLParagraphElement>('ar-error')

function createPieceGeometry(pieceId: string): string {
  const pieces: Record<string, string> = {
    pawn: `<a-cone position="0 0.4 0" radius-bottom="0.25" radius-top="0.05" height="0.7" color="#E03E3E" material="metalness: 0.3; roughness: 0.7"></a-cone>`,
    rook: `<a-box position="0 0.4 0" width="0.4" height="0.8" depth="0.4" color="#E03E3E" material="metalness: 0.3; roughness: 0.7"></a-box>`,
    knight: `<a-cylinder position="0 0.4 0" radius="0.25" height="0.8" color="#E03E3E" material="metalness: 0.3; roughness: 0.7"></a-cylinder>`,
    bishop: `<a-cone position="0 0.5 0" radius-bottom="0.2" radius-top="0.02" height="0.9" color="#E03E3E" material="metalness: 0.3; roughness: 0.7"></a-cone>`,
    queen: `<a-cone position="0 0.6 0" radius-bottom="0.25" radius-top="0.05" height="1.1" color="#E03E3E" material="metalness: 0.3; roughness: 0.7"><a-sphere position="0 0.6 0" radius="0.15" color="#E03E3E"></a-sphere></a-cone>`,
    king: `<a-cylinder position="0 0.5 0" radius="0.2" height="1" color="#E03E3E" material="metalness: 0.3; roughness: 0.7"><a-box position="0 0.6 0" width="0.3" height="0.2" depth="0.1" color="#E03E3E"></a-box></a-cylinder>`,
  }
  return pieces[pieceId] || pieces.pawn
}

function showPieceInfo(pieceName: string, show: boolean) {
  pieceInfoEl.textContent = pieceName
  if (show) {
    pieceInfoEl.classList.add('visible')
    setTimeout(() => {
      pieceInfoEl.classList.remove('visible')
    }, 3000)
  } else {
    pieceInfoEl.classList.remove('visible')
  }
}

pieceSelector.addEventListener('click', (e) => {
  const target = e.target as HTMLButtonElement
  if (!target.classList.contains('piece-btn')) return

  const pieceId = target.dataset.piece
  if (!pieceId) return

  currentPiece = pieceId
  const piece = CHESS_PIECES.find(p => p.id === pieceId)

  document.querySelectorAll('.piece-btn').forEach(btn => {
    btn.classList.remove('active')
  })
  target.classList.add('active')

  if (piece) {
    if (chessPieceEntity) {
      const entity = chessPieceEntity as any
      entity.innerHTML = createPieceGeometry(pieceId)
      entity.removeAttribute('animation')
      void entity.offsetWidth
      entity.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear')
      entity.classList.remove('fade-in')
      void entity.offsetWidth
      entity.classList.add('fade-in')
    }

    if (isMarkerVisible) {
      showPieceInfo(piece.name, true)
    }
  }
})

function updateViewport() {
  const scene = document.querySelector('a-scene') as any
  if (scene && scene.renderer) {
    scene.renderer.setSize(window.innerWidth, window.innerHeight)
  }
}

startArBtn.addEventListener('click', async () => {
  if (arStarted) return
  
  arStarted = true
  startArBtn.textContent = 'Memuat...'
  startArBtn.disabled = true
  
  const aframeLoaded = typeof (window as any).AFRAME !== 'undefined'
  const arjsLoaded = typeof (window as any).ARjs !== 'undefined'
  console.log('A-Frame loaded:', aframeLoaded)
  console.log('AR.js loaded:', arjsLoaded)
  
  if (!aframeLoaded || !arjsLoaded) {
    startArBtn.textContent = 'AR tidak tersedia'
    statusText.textContent = 'Error'
    statusDot.classList.remove('active')
    arErrorEl.textContent = 'AR.js atau A-Frame gagal dimuat. Periksa koneksi internet Anda.'
    arErrorEl.classList.add('visible')
    console.error('AR.js or A-Frame not loaded')
    return
  }
  
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: { 
        facingMode: 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      } 
    })
    console.log('Camera stream obtained:', stream.id)
    stream.getTracks().forEach(track => track.stop())
    
    const sceneEl = document.querySelector('a-scene')
    if (sceneEl) {
      console.log('A-Frame scene element found, initializing AR...')
    }
    
    startArBtn.textContent = 'Kamera siap!'
    statusDot.classList.add('active')
    statusText.textContent = 'Siap'
    setTimeout(() => {
      loadingEl.style.display = 'none'
    }, 1500)
  } catch (err: any) {
    startArBtn.textContent = 'Izinkan kamera'
    startArBtn.disabled = false
    arStarted = false
    arErrorEl.textContent = 'Camera: ' + (err.message || 'Permission denied')
    arErrorEl.classList.add('visible')
    console.error('Camera error:', err)
  }
})

const scene = document.querySelector('a-scene')

if (scene) {
  scene.addEventListener('loaded', () => {
    console.log('AR Scene loaded successfully')
    statusDot.classList.add('active')
    statusText.textContent = 'Siap'
    updateViewport()
  })

  scene.addEventListener('arjs-video-start', () => {
    console.log('AR Camera started')
    loadingEl.style.display = 'none'
    statusDot.classList.add('active')
    statusText.textContent = 'Kamera Aktif'
    instructionsEl.style.display = 'block'
    updateViewport()
  })
}

const markerEl = document.querySelector('a-marker')
if (markerEl) {
  markerEl.addEventListener('markermatched', () => {
    console.log('Marker matched!')
    isMarkerVisible = true
    const piece = CHESS_PIECES.find(p => p.id === currentPiece)
    if (piece) {
      showPieceInfo(piece.name, true)
    }
    instructionsEl.textContent = 'Marker terdeteksi! Pilih bidak di bawah'
  })

  markerEl.addEventListener('markerunmatched', () => {
    console.log('Marker unmatched')
    isMarkerVisible = false
    instructionsEl.textContent = 'Scan marker Hiro untuk menampilkan bidak catur 3D'
  })
}

setTimeout(() => {
  if (loadingEl && loadingEl.style.display !== 'none') {
    console.warn('AR load timeout - showing fallback UI')
    loadingEl.style.display = 'none'
    statusDot.classList.add('active')
    statusText.textContent = 'Siap'
  }
}, 10000)

function handleResize() {
  const width = window.innerWidth
  const pieceBtns = document.querySelectorAll('.piece-btn')
  
  let btnSize = 48
  if (width < 480) {
    btnSize = 42
  } else if (width < 768) {
    btnSize = 46
  } else if (width >= 1024) {
    btnSize = 52
  }
  
  pieceBtns.forEach(btn => {
    (btn as HTMLButtonElement).style.width = btnSize + 'px'
    ;(btn as HTMLButtonElement).style.height = btnSize + 'px'
  })
  
  updateViewport()
}

window.addEventListener('error', (e) => {
  console.warn('AR initialization issue:', e.message)
})

window.addEventListener('resize', handleResize)
window.addEventListener('orientationchange', () => {
  setTimeout(handleResize, 100)
})

handleResize()