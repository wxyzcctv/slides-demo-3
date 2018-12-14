let $buttons = $('#buttonWrapper>button')
let $slides = $('#slides')
let $images = $slides.children('img')
// 获得所有的images
let current = 0

makeFakeSlides()
$slides.css({transform:'translateX(-400px)'})
// 这个时候就需要将第一个元素左移一张图片的宽度
bindEvents()
$(next).on('click',function(){
    gotoSlide(current+1)
})
$(previous).on('click',function(){
    gotoSlide(current-1)
})
// 点击到上一张和下一张
let timer = setInterval(() => {
    gotoSlide(current+1)
}, 2000);
$('.container').on('mouseenter',function(){
    window.clearInterval(timer)
})
$('.container').on('mouseleave',function(){
    timer = setInterval(() => {
        gotoSlide(current+1)
    }, 2000);
})

function makeFakeSlides(){
    let $firstCopy = $images.eq(0).clone(true)
    // 复制第一张image，true表示复制子元素
    let $lastCopy = $images.eq($images.length-1).clone(true)
    // 复制第二张image，false表示复制本元素

    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
    // 将复制的第一张放到最后面，将复制的最后一张放到最前面
}
function bindEvents(){
    $('#buttonWrapper').on('click','button',function(e){
        let $button =$(e.currentTarget)
        let index = $button.index()
        gotoSlide(index)
    })
}
function gotoSlide(index){
    if(index > $buttons.length-1){
        index=0
    }else if(index<0){
        index = $buttons.length-1
    }
    if(current === $buttons.length-1 && index ===0){
        $slides.css({transform:`translateX(${-($buttons.length+1)*400}px)`})
        .one('transitionend',function(){
            $slides.hide().offset()
            $slides.css({transform:`translateX(${-(index+1)*400}px)`})
            .show()
        })
    }else if(current === 0 && index === $buttons.length - 1){
        $slides.css({transform:`translateX(0px)`})
        .one('transitionend',function(){
            $slides.hide().offset()
            $slides.css({transform:`translateX(${-(index+1)*400}px)`})
            .show()
        })
    }else{
        $slides.css({transform:`translateX(${-(index+1)*400}px)`})
    }
    current =index
}


