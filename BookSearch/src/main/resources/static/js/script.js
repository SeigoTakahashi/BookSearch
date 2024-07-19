document.getElementById('title').addEventListener('click', () => {
	document.getElementById('title-search').style.display = 'block';
	document.getElementById('author-search').style.display = 'none';
});

document.getElementById('author').addEventListener('click', () => {
	document.getElementById('author-search').style.display = 'block';
	document.getElementById('title-search').style.display = 'none';
});

document.getElementById('title-btn').addEventListener('click', async () => {

	// フォームに入力されたテキストの取得
	const textValue = document.getElementById("titleText").value;
	const maxResults = document.getElementById("maxResults").value;
	// 書籍検索ができるGoogle Books APIのエンドポイントにフォームから取得したテキストを埋め込む
	const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${textValue}&maxResults=${maxResults}`);
	const data = await res.json();
    console.log(data);
	const bookItem = document.getElementById("bookItem");
	
	for (let i = 0; i < data.items.length; i++) {
		// 例外が起きなければtryブロック内のコードが実行される
		
		try {
			const bookInfo = data.items[i].volumeInfo;
			const bookImg = bookInfo.imageLinks && bookInfo.imageLinks.smallThumbnail ? bookInfo.imageLinks.smallThumbnail : 'No image';
			const bookTitle = bookInfo.title ? bookInfo.title : 'No Data';
			const bookContent = bookInfo.description ? bookInfo.description : 'No Data';
			const bookLink = bookInfo.infoLink ? bookInfo.infoLink : '#';
			const pageCount = bookInfo.pageCount !== undefined ? bookInfo.pageCount : '?';
			const publishedDate = bookInfo.publishedDate ? bookInfo.publishedDate : 'No Data';
			const isbn = bookInfo.industryIdentifiers && bookInfo.industryIdentifiers.length > 0 ? bookInfo.industryIdentifiers[0].identifier : 'No Data';
			const makeElement = document.createElement("div");
			const author = bookInfo.authors ? bookInfo.authors : 'No Data';

			if (pageCount === undefined) {
				pageCount = "?";
			}
			// 要素別に識別できるようにidに数字を埋め込む
			makeElement.setAttribute("id", `bookItem${i}`);
			// 取得した要素に作成した要素を挿入
			bookItem.appendChild(makeElement);
			// 作成した要素を習得
			const getBookItem = document.getElementById(`bookItem${i}`);
			
			// APIで取得したデータの分だけHTML要素を作成し、取得した要素にを埋め込む
			const setBookElement = `
                <div class="container">
                    <div class="col">
                        <div class="card shadow-sm">
                            <div class="card-body">
                                <img src="${bookImg}"><br>
                                <a id="link${i}" class="card-text" target="_blank">${bookTitle}</a>
                                <div class="d-flex justify-content-between align-items-center">
                                    <p>${bookContent}</p>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <p>${author} 著</p>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <p>${pageCount}ページ</p>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <p>${publishedDate}発売</p>
                                </div>
                                <form action="/register" method="post">
                                	<input type="hidden" value="${bookTitle}" name="title">
                                	<input type="hidden" value="${bookImg}" name="src">
                                	<input type="hidden" value="${pageCount}" name="pages">
                                	<input type="hidden" value="${bookLink}" name="link">
                                	<button type="submit" class="btn btn-primary">保存</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            `;
			// APIから取得した、実際のGoogle Booksのサイトに飛ばすためのリンクを埋め込む
			getBookItem.innerHTML = setBookElement;
			const link = document.getElementById(`link${i}`);
			link.href = bookLink;
			
			// 途中で例外が発生した場合はcatchブロック内のコードが実行される
		} catch (e) {
			console.log(i);
			console.log(e);
			continue;
		};
	};
});

document.getElementById('author-btn').addEventListener('click', async () => {
	// フォームに入力されたテキストの取得
	const textValue = document.getElementById("authorText").value;
	const maxResults = document.getElementById("maxResults").value;
	// 書籍検索ができるGoogle Books APIのエンドポイントにフォームから取得したテキストを埋め込む
	const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${textValue}&maxResults=${maxResults}`);
	const data = await res.json();
	const bookItem = document.getElementById("bookItem");
	console.log(data);
	for (let i = 0; i < data.items.length; i++) {
		// 例外が起きなければtryブロック内のコードが実行される
		try {

			const bookInfo = data.items[i].volumeInfo;
			const bookImg = bookInfo.imageLinks && bookInfo.imageLinks.smallThumbnail ? bookInfo.imageLinks.smallThumbnail : 'No image';
			const bookTitle = bookInfo.title ? bookInfo.title : 'No Data';
			const bookContent = bookInfo.description ? bookInfo.description : 'No Data';
			const bookLink = bookInfo.infoLink ? bookInfo.infoLink : '#';
			const pageCount = bookInfo.pageCount !== undefined ? bookInfo.pageCount : '?';
			const publishedDate = bookInfo.publishedDate ? bookInfo.publishedDate : 'No Data';
			const isbn = bookInfo.industryIdentifiers && bookInfo.industryIdentifiers.length > 0 ? bookInfo.industryIdentifiers[0].identifier : 'No Data';
			const makeElement = document.createElement("div");
			const author = bookInfo.authors ? bookInfo.authors : 'No Data';
			

			if (!pageCount) {
				pageCount = "?";
			}
			// 要素別に識別できるようにidに数字を埋め込む
			makeElement.setAttribute("id", `bookItem${i}`);
			// 取得した要素に作成した要素を挿入
			bookItem.appendChild(makeElement);
			// 作成した要素を習得
			const getBookItem = document.getElementById(`bookItem${i}`);

			// APIで取得したデータの分だけHTML要素を作成し、取得した要素にを埋め込む
			const setBookElement = `
                <div class="container">
                    <div class="col">
                        <div class="card shadow-sm">
                            <div class="card-body">
                                <img src="${bookImg}"><br>
                                <a id="link${i}" class="card-text" target="_blank">${bookTitle}</a>
                                <div class="d-flex justify-content-between align-items-center">
                                    <p>${bookContent}</p>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <p>${author} 著</p>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <p>${pageCount}ページ</p>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <p>${publishedDate}発売</p>
                                </div>
                                <form action="/register" method="post">
                                	<input type="hidden" value="${bookTitle}" name="title">
                                	<input type="hidden" value="${bookImg}" name="src">
                                	<input type="hidden" value="${pageCount}" name="pages">
                                	<input type="hidden" value="${bookLink}" name="link">
                                	<button type="submit" class="btn btn-primary">保存</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            `;
			// APIから取得した、実際のGoogle Booksのサイトに飛ばすためのリンクを埋め込む
			getBookItem.innerHTML = setBookElement;
			const link = document.getElementById(`link${i}`);
			link.href = bookLink;

			// 途中で例外が発生した場合はcatchブロック内のコードが実行される
		} catch (e) {
			continue;
		};
	};
});