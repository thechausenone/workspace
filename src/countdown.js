module.exports = function countdown(tick){
    let count  = 3

    let timer  = setInterval(() => {
        tick(count--)
        if (count === -1)
            clearInterval(timer)
    }, 1000)
}