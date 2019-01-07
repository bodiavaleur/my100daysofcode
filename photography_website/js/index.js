window.onload = () => {
    let menuBtn = document.getElementById('menu-btn')
    let circle = document.getElementById('circle')

    // Add click event to circle button
    circle.addEventListener('click', function () {
        backgroundFade();
    })

    // Add click event to menu button
    menuBtn.addEventListener('click', function () {
        toggleLinks()
    })
}

function toggleLinks() {
    /* Toggle visibility of navigation bar links */
    const navLinks = document.getElementById('nav-links')
    // If links is hidden make it visible and vice versa 
    let currentState = navLinks.style.visibility ? '' : 'visible'
    navLinks.style.visibility = currentState
    return currentState
}

function backgroundFade() {
    /* Change gallery background */
    const sectionBg = document.getElementById('background')
    const images = [
        'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd27e6afea10629578acb8ca65e51d40&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1528920304568-7aa06b3dda8b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cd37065597aa59b2cb078cc36d10c046&auto=format&fit=crop&w=1951&q=80',
        'https://images.unsplash.com/photo-1495741738915-f877fcd5f5f7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bbbc29e0c24a347986457eac0e16974b&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1460647927807-8e664765c97c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=267a84e640dc58ae3e5e382af6d02994&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1536703965899-85f65f163d58?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f2345153fe5aaa0a7f418499dcf748ab&auto=format&fit=crop&w=1951&q=80',
        'https://images.unsplash.com/photo-1516528387618-afa90b13e000?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bad7097feea3a7c940e2c57a3615e9ec&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1516528060732-e9b76180f7a0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2b4732d0291e4039c2fd0b38b4d8a5ac&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1531273005-b136ec58b77e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=39a5225d0ae4b29c6fc8c772a71e4ec3&auto=format&fit=crop&w=1951&q=80',
        'https://images.unsplash.com/photo-1515896769750-31548aa180ed?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=754101c41abc2bda9ccc748f67219905&auto=format&fit=crop&w=2034&q=80',
        'https://images.unsplash.com/photo-1521086485249-351414b3ac65?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b5ca8ff68db6508e7916bd4be82a7a34&auto=format&fit=crop&w=1926&q=80'
    ]
    const imgIndex = parseInt(Math.random() * images.length)

    // Pick random background from list and set it as background-image
    sectionBg.style.backgroundImage = `url(${images[imgIndex]})`
}