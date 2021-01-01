import React, {useEffect} from 'react'
import './index.css';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {useState} from 'react'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import GridLayout from 'react-grid-layout';

function App(props) {
  let [todos, setTodos] = useState(formatData())

  useEffect(() => {
    let {removekeydown, removekeyup} = detectSpacebar()
    formatData()
    return () => {
      removekeyup()
      removekeydown()
    } 
  }, [])

  const inv = (hex) => '#' + hex.match(/[a-f0-9]{2}/ig).map(e => (255 - parseInt(e, 16) | 0).toString(16).replace(/^([a-f0-9])$/, '0$1')).join('')


  let [disableCanvas, setDisableCanvas] = useState(true)
  let [allowObjectDragging, setAllowObjectDragging] = useState(true)

  let [defaultScale, setDefaultScale] = useState(1)
  
  function formatData() {
    let columnCount = 4
    let maxBlocksPerColumn = props.tasks.length / columnCount
    let layout = []
    let i = 0
    const cardWidth = 3
    const cardHeight = 8
    const inlineYaxis = 1
    while(i < columnCount) {
      let rng = Math.floor(Math.random() * Math.floor(maxBlocksPerColumn))
      let maxBlockCount = rng > 0 ? rng : 1
      let n = 0
      while(n < maxBlockCount) {
        let t = props.tasks[n]
        layout.push({
          i: `${i}${n}`,
          x: n*3,
          y: inlineYaxis,
          w: cardWidth,
          h: cardHeight,
          body: t.body,
          bg: `#${Math.floor(Math.random()*16777215).toString(16)}`
        })
        n += 1
      }
  
      i += 1
    }
    return layout
  }

  function renderList() {
    return todos.map((n) => {
      return (
        <div key={n.i} className="d-block card p-2 m-2" style={{backgroundColor: n.bg}}>
          <strong style={{color: inv(n.bg), fontSize: '120%'}}>
            {n.body}
          </strong>
        </div>
      )
    })
  }

  function detectSpacebar() {
    let body = document.querySelector('body')

    function allowCanvasPanning(e) {
      if(e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
        setDisableCanvas(!disableCanvas)
        body.classList.add('grabbing')
        setAllowObjectDragging(false)
      }
    }

    function allowCardResizing(e) {
      if(e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
        setAllowObjectDragging(true)
        body.classList.remove('grabbing')
      }
    }

    window.addEventListener('keydown', allowCanvasPanning );
    window.addEventListener('keyup', allowCardResizing) ;
    return {
      removekeydown: () => {window.removeEventListener('resize', allowCanvasPanning)},
      removekeyup: () => {window.removeEventListener('keyup', allowCardResizing)},
    }
  }

  return (

    <TransformWrapper
      defaultScale={defaultScale}
      defaultPositionX={200}
      defaultPositionY={100}
      wheel={{
        wheelEnabled: false
      }}
      options={{
        limitToBounds: false,
        disabled: disableCanvas,
        centerContent: true
      }}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          <div 
            style={{
              position: 'fixed', 
              bottom: 0, 
              zIndex: 200,
              left: 0
            }}
          >
            <button onClick={zoomIn} className="btn btn-primary m-1">+</button>
            <button onClick={(e) => {zoomOut(e); setDefaultScale(0.5)}} className="btn btn-secondary m-1">-</button>
            <button onClick={resetTransform} className="btn btn-warning m-1">x</button>
          </div>
          <TransformComponent>
            <GridLayout 
              onDragStart={() => {setDisableCanvas(true)}}
              onDrag={() => {setDisableCanvas(true)}}
              onDragStop={() => {setDisableCanvas(false)}}
              onResizeStop={() => {setDisableCanvas(false)}}
              onResizeStart={() => {setDisableCanvas(true)}}
              onResize={() => {setDisableCanvas(true)}}
              className="layout" 
              layout={todos} 
              cols={12} 
              rowHeight={30} 
              width={1920}
              breakpoints={{lg: 1920, md: 996, sm: 768, xs: 480, xxs: 0}}
              isDraggable={allowObjectDragging}
            >
              {renderList()}  
            </GridLayout>
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  
  );
}

export default App;


