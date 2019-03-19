function queenChecker(arr) {
  let boardLength = 0

  const extractXandY = (string, i) => {
    const parsedPositions = string.match(/\d+,\d+/)
    if (!parsedPositions) throw Error(`Queen position input Error - check the given position${i >= 0 ? ' at ' + i : 's'}`)
    const positions = parsedPositions[0].split(',')
    return { x: Number(positions[0]), y: Number(positions[1]) }
  }
  const extractPointSums = ({ transversal }) => {
    const { izqSupToDerInf, izqInfToDerSup } = transversal
    return { izqSupToDerInf: izqSupToDerInf.getPointSums(), izqInfToDerSup: izqInfToDerSup.getPointSums() }
  }
  const checkTransversalCollision = (currentQueen, collisionQueen) => {
    const { izqInfToDerSup: currentQueenIzqS, izqInfToDerSup: currentQueenIzqI } = extractPointSums(currentQueen)
    const { izqInfToDerSup: collisionQueenIzqS, izqInfToDerSup: collisionQueenIzqI } = extractPointSums(collisionQueen)
    return currentQueenIzqS.fromPointSum === collisionQueenIzqS.fromPointSum && currentQueenIzqS.toPointSum === collisionQueenIzqS.toPointSum || currentQueenIzqI.fromPointSum === collisionQueenIzqI.fromPointSum && currentQueenIzqI.toPointSum === collisionQueenIzqI.toPointSum
  }

  arr.forEach((v, i) => {
    const { x, y } = extractXandY(v, i)
    boardLength = x >= y ? x > boardLength ? x : boardLength : y > boardLength ? y : boardLength
  })
  const queens = arr.map((v, i) => {
    const { x, y } = extractXandY(v, i)
    return {
      x,
      y,
      transversal: getTransversal(x, y, boardLength)
    }
  })
  const queenIndex = queens.findIndex((q, qI, arr) => {
    return arr.find((v, i) => {
      if (qI === i) return
      return q.x === v.x || q.y === v.y || checkTransversalCollision(q, v)
    })
  })
  return queenIndex === -1 ? true : `(${queens[queenIndex].x},${queens[queenIndex].y})`
}
function getTransversal(x, y, boardLength) {
  return {
    izqInfToDerSup: {
      fromPoint: {
        x: x + y <= boardLength + 1 ? 1 : x === boardLength ? y : y - (boardLength - x),
        y: x + y > boardLength ? boardLength : (x + y) - 1
      },
      toPoint: {
        x: x + y > boardLength ? boardLength : (x + y) - 1,
        y: x + y <= boardLength ? 1 : y === x ? y - (boardLength - x) : y - (boardLength - x)
      },
      getPointSums: function () {
        return { fromPointSum: this.fromPoint.x + this.fromPoint.y, toPointSum: this.toPoint.x + this.toPoint.y }
      }
    },
    izqSupToDerInf: {
      fromPoint: {
        x: y >= x ? 1 : x - (y - 1),
        y: x >= y ? 1 : y - (x - 1)
      },
      toPoint: {
        x: x >= y ? boardLength : boardLength - (y - x),
        y: x <= y ? boardLength : boardLength - (x - y)
      },
      getPointSums: function () {
        return { fromPointSum: this.fromPoint.x + this.fromPoint.y, toPointSum: this.toPoint.x + this.toPoint.y }
      }
    }
  }
}
// Example where it collides
console.log(queenChecker(["(2,1)", "(5,3)", "(6,3)", "(8,4)", "(3,4)", "(1,8)", "(7,7)", "(5,8)"]))
// Example where it doesn't collides
console.log(queenChecker(["(4,1)", "(7,2)", "(3,3)", "(8,4)", "(2,5)", "(5,6)", "(1,7)", "(6,8)"]))

// Minified version
// function queenChecker(t){let o=0;const n=t=>{const o=t.match(/\d+,\d+/)[0].split(",");return{x:Number(o[0]),y:Number(o[1])}},i=({transversal:t})=>{const{izqSupToDerInf:o,izqInfToDerSup:n}=t;return{izqSupToDerInf:o.getPointSums(),izqInfToDerSup:n.getPointSums()}};t.forEach(t=>{const{x:i,y:r}=n(t);o=i>=r?i>o?i:o:r>o?r:o});const r=t.map((t,i)=>{const{x:r,y:u}=n(t);return{x:r,y:u,transversal:getTransversal(r,u,o)}}),u=r.findIndex((t,o,n)=>n.find((n,r)=>{if(o!==r)return t.x===n.x||t.y===n.y||((t,o)=>{const{izqInfToDerSup:n,izqInfToDerSup:r}=i(t),{izqInfToDerSup:u,izqInfToDerSup:e}=i(o);return n.fromPointSum===u.fromPointSum&&n.toPointSum===u.toPointSum||r.fromPointSum===e.fromPointSum&&r.toPointSum===e.toPointSum})(t,n)}));return-1===u||`(${r[u].x},${r[u].y})`}function getTransversal(t,o,n){return{izqInfToDerSup:{fromPoint:{x:t+o<=n+1?1:t===n?o:o-(n-t),y:t+o>n?n:t+o-1},toPoint:{x:t+o>n?n:t+o-1,y:t+o<=n?1:o-(n-t)},getPointSums:function(){return{fromPointSum:this.fromPoint.x+this.fromPoint.y,toPointSum:this.toPoint.x+this.toPoint.y}}},izqSupToDerInf:{fromPoint:{x:o>=t?1:t-(o-1),y:t>=o?1:o-(t-1)},toPoint:{x:t>=o?n:n-(o-t),y:t<=o?n:n-(t-o)},getPointSums:function(){return{fromPointSum:this.fromPoint.x+this.fromPoint.y,toPointSum:this.toPoint.x+this.toPoint.y}}}}}console.log(queenChecker(["(2,1)","(5,3)","(6,3)","(8,4)","(3,4)","(1,8)","(7,7)","(5,8)"]));
