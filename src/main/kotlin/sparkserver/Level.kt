package sparkserver

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken

class Level() {
    val type = object : TypeToken<MutableList<LevelItem>>() {}.type
    var levelItemsList: MutableList<LevelItem>
    val size: Int = 10
    init {
        this.levelItemsList = mutableListOf(
            LevelItem(0, x=1, y=0, z=1, type="wall"),
            LevelItem(id=1, x=8, y=0, z=1, type="wall"),
            LevelItem(id=2, x=8, y=0, z=8, type="wall"),
            LevelItem(id=3, x=1, y=0, z=8, type="wall"),
            LevelItem(id=4, x=1, y=0, z=7, type="wall"),
            LevelItem(id=5, x=1, y=0, z=6, type="wall"),
            LevelItem(id=6, x=1, y=0, z=2, type="wall"),
            LevelItem(id=7, x=1, y=0, z=3, type="wall"),
            LevelItem(id=8, x=2, y=0, z=8, type="wall"),
            LevelItem(id=9, x=3, y=0, z=8, type="wall"),
            LevelItem(id=10, x=6, y=0, z=8, type="wall"),
            LevelItem(id=11, x=7, y=0, z=8, type="wall"),
            LevelItem(id=12, x=8, y=0, z=7, type="wall"),
            LevelItem(id=13, x=8, y=0, z=6, type="wall"),
            LevelItem(id=14, x=8, y=0, z=2, type="wall"),
            LevelItem(id=15, x=8, y=0, z=3, type="wall"),
            LevelItem(id=16, x=7, y=0, z=1, type="wall"),
            LevelItem(id=17, x=6, y=0, z=1, type="wall"),
            LevelItem(id=18, x=2, y=0, z=1, type="wall"),
            LevelItem(id=19, x=3, y=0, z=1, type="wall"),
            LevelItem(id=20, x=2, y=0, z=2, type="light"),
            LevelItem(id=21, x=2, y=0, z=7, type="light"),
            LevelItem(id=22, x=7, y=0, z=7, type="light"),
            LevelItem(id=23, x=7, y=0, z=2, type="light")
        )
    }
    fun assignLevelItemsList(list: MutableList<LevelItem>) {
        this.levelItemsList = list
    }

}