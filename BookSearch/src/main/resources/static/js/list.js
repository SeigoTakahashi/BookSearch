const getPurchaseStatus = (isbn) => {
	return localStorage.getItem(isbn) === "purchased";
}

const setPurchaseStatus = (isbn, status) => {
	localStorage.setItem(isbn, status ? "purchased" : "not_purchased");
}

const favorite = (id) => {
	const btn = document.getElementById(id);
	if (btn.textContent === "お気に入り登録") {
		btn.textContent = "お気に入り済";
		btn.classList.remove('btn-danger');
		btn.classList.add('btn-success');
	} else {
		btn.textContent = "お気に入り登録";
		btn.classList.remove('btn-success');
		btn.classList.add('btn-danger');
	}
	window.location.href = `/favorite/${id}`;
}

const removeBook = (id) => {
	const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
	deleteModal.show();
	document.getElementById('deleteModal').addEventListener('hidden.bs.modal', () => {
		window.location.href = `/deleteList/${id}`;
	});
	
}

//document.addEventListener('DOMContentLoaded', function() {
//
//	const getBook = async (isbn) => {
//		const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
//		const data = await res.json();
//		if (data.totalItems === 0) {
//			return;
//		}
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
//				const isPurchased = getPurchaseStatus(isbn);
//				const btnClass = isPurchased ? 'btn-success' : 'btn-danger';
//				const btnText = isPurchased ? '購入済' : '未購入';
//
//				if (pageCount === undefined) {
//					pageCount = "?";
//				}
//				const setBookElement = `
//                			<div class="card-body border">
//                                <img src="${bookImg}"><br>
//                                <a href="${bookLink}" class="card-text" target="_blank">${bookTitle}</a>
//                                <div class="d-flex justify-content-between align-items-center">
//                                    <p>${pageCount}ページ</p>
//                                </div>
//                                <button type="button" class="btn ${btnClass}" onclick="purchase('${isbn}')" id="${isbn}">${btnText}</button>
//                            	<button type="button" class="delete-btn" aria-label="Close" onclick="removeBook('${isbn}')">&times;</button>
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
//	for (let i = 0; i < lists.length; i++) {
//		getBook(lists[i].isbn).then((data) => {
//			if (data === undefined) {
//				return;
//			}
//			book_info.innerHTML += data;
//		});
//	}
//
//});
//
