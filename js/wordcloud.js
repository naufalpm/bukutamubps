// Encapsulate the word cloud functionality
function wordCloud(selector) {
    var fill = d3.scale.category20();

    // Construct the word cloud's SVG element
    var svg = d3.select(selector).append("svg")
        .attr("width", 320) // Ukuran lebar SVG
        .attr("height", 320) // Ukuran tinggi SVG
        .append("g")
        .attr("transform", "translate(200,200)"); // Posisi tengah SVG

    // Draw the word cloud
    function draw(words) {
    var cloud = svg.selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
    }

    // Public method to update the word cloud
    function update(words) {
    d3.layout.cloud().size([400, 400]) // Ukuran word cloud
        .words(words)
        .padding(5)
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .font("Impact")
        .fontSize(function(d) { return d.size; })
        .on("end", draw)
        .start();
    }

    return {
    update: update
    };
}

// Sample data dalam Bahasa Indonesia
var sentences = [
    "Pagi itu, langit cerah terlihat indah di ufuk timur, Udara segar membuatku semangat untuk memulai hari ini, Ketika melintas di taman, aku melihat bunga-bunga berwarna cerah, Anak-anak riang bermain di halaman sekolah, Sore itu, hujan turun dengan lebat di kota ini."
];

// Daftar stop words dalam Bahasa Indonesia
var stopWords = [
    "yang", "di", "dan", "ini", "itu", "dengan", "untuk", "pada", "ke", "oleh", "saat", "telah", "akan", "ada", "dari", "juga", "mereka", "kita", "saya", "kamu", "atau", "antara", "hanya", "sebagai", "masih", "namun", "bisa", "agar", "ataupun", "bahkan", "kembali", "sampai", "sehingga", "sudah", "tetapi", "terhadap", "sebelum", "setelah", "dimana", "kapan", "bagi", "dalam", "luar", "lagi", "terus", "sedangkan", "melainkan", "seakan", "sekali", "walaupun", "hingga", "tentu", "lebih", "diberikan", "didapatkan", "maka"
];

// Prepare the words for the word cloud (unique words only, without stop words)
function getWordsWithoutStopWords(i) {
    var wordList = sentences[i]
        .toLowerCase() // Ubah ke huruf kecil untuk memastikan kesamaan kata
        .replace(/[!\.,:;\?]/g, '') // Hapus tanda baca
        .split(' '); // Pisahkan kata-kata menjadi array

    // Filter kata-kata stop words
    var filteredWords = wordList.filter(function(word) {
    return stopWords.indexOf(word) === -1; // Kata tidak boleh ada dalam daftar stop words
    });

    // Menggunakan Set untuk menyaring kata-kata unik
    var uniqueWords = Array.from(new Set(filteredWords));

    return uniqueWords.map(function(d) {
    return {text: d, size: 5 + Math.random() * 30}; // Mengubah rentang ukuran font disini
    });
}

// Initialize word cloud
var myWordCloud = wordCloud('#wordcloud');

// Update word cloud with unique words (without stop words)
myWordCloud.update(getWordsWithoutStopWords(0));