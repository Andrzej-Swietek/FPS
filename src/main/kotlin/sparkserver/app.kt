package sparkserver

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import spark.Request
import spark.Response
import spark.Spark.*

import java.sql.DriverManager
var level = Level()

fun main() {
    staticFiles.location("/public")
    port(getHerokuPort())


    get("/") { req,res -> "game.html" } // get pliku game.html
    get("/game") { req,res -> serveGame(req,res) } // get pliku game.html
    get("/editor") { req,res -> serveEditor(req,res) } // get pliku editor.html
    post("/add") { req,res -> add(req,res) } // dodanie danych levelu
    post("/load") { req,res -> load(req,res) } // pobranie danych levelu

}

fun getHerokuPort(): Int {
    val processBuilder = ProcessBuilder()
    return if (processBuilder.environment()["PORT"] != null) {
        processBuilder.environment()["PORT"]!!.toInt()
    } else 5000
}

fun serveGame(req: Request,res: Response) {
    res.type("text/html")
    res.redirect("game.html")
}

fun serveEditor(req: Request,res: Response) {
    res.type("text/html")
    res.redirect("editor.html")
}

fun add(req: Request, res: Response) {
    res.header("Access-Control-Allow-Origin", "*");
//    to dodaje jsona to listy
    println(req.body())
    val type = object : TypeToken<MutableList<LevelItem>>() {}.type
    var list: MutableList<LevelItem> = Gson().fromJson(req.body(), type)
    println(list)
    level.assignLevelItemsList(list)
}

fun load(req:Request,res:Response):String {
    res.header("Access-Control-Allow-Origin", "*");
    // to zwraca jsona
    res.type("application/json")
    println(Gson().toJson(level.levelItemsList))

    val respData = Gson().toJson(level.levelItemsList)

    println( respData )

    return respData
}