const removeBook = (id) => {
	const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
	deleteModal.show();
	document.getElementById('deleteModal').addEventListener('hidden.bs.modal', () => {
		window.location.href = `/deleteFavorite/${id}`;
	});
	
}

//document.addEventListener('DOMContentLoaded', function() {
//
//	const getBook = async (isbn) => {
//		const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
//		const data = await res.json();
//		for (let i = 0; i < data.items.length; i++) {
//			// 例外が起きなければtryブロック内のコードが実行される
//			try {
//				// JSONデータの取得
//				// 画像を表示するリンク
//				const bookImg = data.items[i].volumeInfo.imageLinks.smallThumbnail;
//				// 本のタイトル
//				const bookTitle = data.items[i].volumeInfo.title;
//
//				// 各書籍のGoogle Booksへのリンク
//				const bookLink = data.items[i].volumeInfo.infoLink;
//				// 取得したデータを入れるための要素を作成
//				const pageCount = data.items[i].volumeInfo.pageCount;
//
//				const isbn = data.items[i].volumeInfo.industryIdentifiers[1].identifier;
//
//				if (pageCount === undefined) {
//					pageCount = "?";
//				}
//				const setBookElement = `
//                			<div class="card-body border" id="${isbn}">
//                                <img src="${bookImg}"><br>
//                                <a href="${bookLink}" class="card-text" target="_blank">${bookTitle}</a>
//                                <div class="d-flex justify-content-between align-items-center">
//                                    <p>${pageCount}ページ</p>
//                                </div>
//                                <div class="d-flex justify-content-between align-items-center">
//                                    <p>${purchases[i].purchase_date}購入</p>
//                                </div>
//                                <button type="button" class="delete-btn" aria-label="Close" onclick="removeBook('${isbn}')">&times;</button>
//                            </div>
//            `;
//				return setBookElement;
//			} catch (e) {
//				continue;
//			};
//		};
//
//	}
//	const book_info = document.getElementById('book-info');
//	for (let i = 0; i < purchases.length; i++) {
//		getBook(purchases[i].isbn).then((data) => {
//			book_info.innerHTML += data;
//		});
//	}
//
//});
//
