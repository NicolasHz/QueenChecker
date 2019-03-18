function queenChecker(arr) {
  let queenPosition = ''
  let boardLength = 0

  const extractXandY = (string) => {
    const positions = string.match(/\d+,\d+/)[0].split(',')
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

  arr.forEach(v => {
    const { x, y } = extractXandY(v)
    boardLength = x >= y ? x > boardLength ? x : boardLength : y > boardLength ? y : boardLength
  })
  const queens = arr.map((v, i) => {
    const { x, y } = extractXandY(v)
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
console.log(queenChecker(["(2,1)", "(5,3)", "(6,3)", "(8,4)", "(3,4)", "(1,8)", "(7,7)", "(5,8)"]))s
