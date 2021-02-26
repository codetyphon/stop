controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    hero.setVelocity(0, 0)
    hero.setImage(sprites.castle.princessBack0)
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    hero.setVelocity(0, -50)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.over(false)
})
let obj: Sprite = null
let hero: Sprite = null
music.setVolume(0)
hero = sprites.create(sprites.castle.princessBack1, SpriteKind.Player)
hero.setVelocity(0, -80)
scene.cameraFollowSprite(hero)
let list: Sprite[] = []
hero.setStayInScreen(false)
let val = -50
let obj_img = sprites.dungeon.collectibleRedCrystal
game.onUpdate(function () {
    if (hero.isHittingTile(CollisionDirection.Top)) {
        game.over(true, effects.hearts)
    }
    for (let 值 of list) {
        if (值.x <= 16) {
            值.setVelocity(50, 0)
        }
        if (值.x >= scene.screenWidth() - 16) {
            值.setVelocity(-50, 0)
        }
        if (值.y >= scene.cameraProperty(CameraProperty.Y) + 64) {
            info.changeScoreBy(1)
            值.destroy()
            list.removeAt(list.indexOf(值))
        }
    }
})
game.onUpdateInterval(1000, function () {
    if (hero.vy != 0) {
        obj = sprites.create(obj_img, SpriteKind.Enemy)
        obj.setPosition(randint(0, scene.screenWidth()), hero.y - 100)
        obj.setVelocity(val, 0)
        val = val * -1
        obj.setBounceOnWall(false)
        list.push(obj)
    }
})
game.onUpdateInterval(200, function () {
    if (hero.vy != 0) {
        if (hero.image == sprites.castle.princessBack2) {
            hero.setImage(sprites.castle.princessBack1)
        } else {
            hero.setImage(sprites.castle.princessBack2)
        }
    }
})
