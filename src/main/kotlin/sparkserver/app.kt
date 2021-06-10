package sparkserver

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import spark.Request
import spark.Response
import spark.Spark.*

import java.sql.DriverManager
import java.time.LocalDateTime

var level = Level()

fun main() {
    staticFiles.location("/public")
    port(getHerokuPort())


    get("/") { req,res -> "game.html" } // get pliku game.html
    get("/game") { req,res -> serveGame(req,res) } // get pliku game.html
    get("/editor") { req,res -> serveEditor(req,res) } // get pliku editor.html
    get("/scores") { req,res -> serveScores(req,res) } // get pliku scores.html
    get("/getTotalDamage"){ req,res -> getScores(req,res) }
    post("/add") { req,res -> add(req,res) } // dodanie danych levelu
    post("/load") { req,res -> load(req,res) } // pobranie danych levelu
    post("/attack" ){ req,res -> attack(req,res)}

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

fun serveScores(req: Request,res: Response) {
    res.type("text/html")
    res.redirect("scores.html")
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
//    res.type("text/plain")
    println(Gson().toJson(level.levelItemsList))

    val respData = Gson().toJson(level.levelItemsList)

    println( respData )

    return respData
//    return "{\"test\": \"a\"}"
}

fun attack(req: Request, res: Response):String {
    res.header("Access-Control-Allow-Origin", "*");
    res.type("application/json")
    println(req.body())
    val dmg: AttackDMG = Gson().fromJson(req.body(), AttackDMG::class.java)
    println(dmg)

    try {
        val conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/fps", "postgres", "zaq1@WSX")
        val stmt = conn.createStatement()
        stmt.executeQuery("UPDATE scores SET date='${LocalDateTime.now()}', damage=damage+${dmg.dmg} WHERE id=1;")
        conn.close()
    }  catch (e: Exception) {
        println(e.message)
    }
    return ""
}

fun getScores(req: Request, res: Response):String {
    val damageArr = mutableListOf<AttackDMG>()
    val conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/fps", "postgres", "zaq1@WSX")
    val stmt = conn.createStatement()
    val rs = stmt.executeQuery("SELECT * FROM scores WHERE id=1;")
    while (rs.next()) {
        val d =  AttackDMG(rs.getString("damage").toInt())
        damageArr.add( d )
//        println(d)
    }
    conn.close()
    return Gson().toJson(damageArr)
}