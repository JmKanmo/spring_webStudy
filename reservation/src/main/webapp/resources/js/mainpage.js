
// product event tab component object define
const eventTabObj = {
	categoryIdx: 0,

	drawCategoryTap: function (jsonData) {
		let categoryTab = document.querySelector(".event_tab_lst");
		let template = document.querySelector("#template-category-tab").innerText;
		let bindTemplate = Handlebars.compile(template);
		let ret = bindTemplate(jsonData);
		categoryTab.innerHTML+=ret;
	},
	
	setMorebtnEvent: function () {
		document.querySelector(".more").addEventListener("click", function () {
			this.requestAjax("products", this.categoryIdx, this.getProductListCount());
		}.bind(eventTabObj));
	},

	setCategoryEvent: function () {
		document.querySelector(".event_tab_lst").addEventListener("click", function (evt) {
			if (evt.target.tagName === "A" || evt.target.tagName === "SPAN") {
				this.callAjax(evt);
				this.setActiveMenu(evt.target.closest("LI"));
			}
		}.bind(eventTabObj));
	},

	initEventTab: function () {
		this.requestAjax("categories");
		this.setMorebtnEvent();
		this.setCategoryEvent();
		this.requestAjax("products");
	},

	getProductListCount: function () {
		return (document.querySelector(".wrap_event_box").childElementCount * 2) - 2;
	},

	callAjax: function (evt) {
		let clicked_idx = parseInt(evt.target.closest("LI").getAttribute("data-category"));

		if (clicked_idx != this.categoryIdx) {
			this.requestAjax("products", clicked_idx);
		}
	},

	requestAjax: function (target, id = 0, turn = 0, limit = 4) {
		let xhr = new XMLHttpRequest();
		let params = target + "?" + "id=" + id + "&" + "turn=" + turn + "&" + "limit=" + limit;

		xhr.open("GET", 'http://localhost:8080/reservation/api/' + params, true);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

		xhr.addEventListener("load", function () {
			switch (target)
			{
				case 'products':
					eventTabObj.updateContents(JSON.parse(this.responseText), turn);
					break;
					
				case 'categories':
					eventTabObj.drawCategoryTap(JSON.parse(this.responseText));
					break;
			}
		});

		xhr.send();
	},

	setActiveMenu: function (item) {
		let inactivMenu = item.closest("UL").querySelector(`:nth-child(${this.categoryIdx + 1})`);
		inactivMenu.querySelector(".anchor").classList.remove("active");
		item.querySelector(".anchor").classList.add("active");
		this.categoryIdx = parseInt(item.getAttribute("data-category"));
	},

	updateContents: function (jsonData, turn) {
		let templates = this.getTemplate(jsonData);
		let moreBtn = document.querySelector(".more");

		document.querySelector(".event_lst_txt .pink").innerText = jsonData["productCount"] + "개";

		if (turn === 0) {
			document.querySelector(".wrap_event_box").innerHTML = templates;
		} else {
			document.querySelector(".wrap_event_box").removeChild(moreBtn);
			document.querySelector(".wrap_event_box").innerHTML += templates;
		}

		document.querySelector(".wrap_event_box").appendChild(moreBtn);

		if (jsonData["productCount"] > 0 && this.getProductListCount() < jsonData["productCount"]) {
			if (moreBtn.classList.contains("blind")) {
				moreBtn.classList.remove("blind");
			}
		} else {
			moreBtn.classList.add("blind");
		}
	},

	getTemplate: function (jsonData) {
		let sliced_data = [
			{
				"products": jsonData["products"].slice(0, 2)
			}
			,
			{
				"products": jsonData["products"].slice(2, 4)
			}
		];

		let template = document.querySelector("#template-product-list").innerText;
		let bindTemplate = Handlebars.compile(template);
		let ret_data = [bindTemplate(sliced_data[0]), bindTemplate(sliced_data[1])];
		return ret_data[0] + ret_data[1];
	}
};

// image promotion component object define
const promotionObj = {
	imageList: null,
	imgObject: [],
	slideLen: 0,

	initPromotion : function () {
		this.requestAjax();
		this.slideImage();
	},
	
	initField: function () {
		this.slideLen = Math.floor(this.imageList.childNodes.length / 2);

		for (let i = 1; i <= this.slideLen; i++) {
			let elem = this.imageList.querySelector(`li:nth-child(${i})`);
			this.imgObject.push({
				pos: 0,
				idx: i,
				img: elem
			});
		}
	},

	drawPromotions: function (jsonData) {
		this.imageList = document.querySelector(".visual_img");
		let template = document.querySelector("#template-promotion").innerText;
		let bindTemplate = Handlebars.compile(template);
		let ret = bindTemplate(jsonData);
		this.imageList.innerHTML = ret;
	},
	
	requestAjax: function () {
		let xhr = new XMLHttpRequest();

		xhr.open("GET", 'http://localhost:8080/reservation/api/promotions', true);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

		xhr.addEventListener("load", function () {
			promotionObj.drawPromotions(JSON.parse(this.responseText));
			promotionObj.initField();
		});

		xhr.send();
	},
	
	getNextIndex: function (index) {
		if (index === 0) {
			return this.slideLen - 1;
		}
		else {
			return index - 1;
		}
	},

	convertIndex: function (slideLen, index) {
		if (slideLen <= 1) {
			return 0;
		}
		else if (slideLen > 1 && slideLen < 3) {
			if (index == 1)
				return 1;
			else
				return 2;
		} else {
			return index + 1;
		}
	},

	moveImageEnd: function (idx) {
		this.imgObject[idx]["pos"] = (this.slideLen - this.convertIndex(this.slideLen, this.imgObject[idx]["idx"])) * this.imageList.offsetWidth;
		this.imgObject[idx]["img"].style.transition = "transform 0s";
		this.imgObject[idx]["img"].style.transform = `translateX(${this.imgObject[idx]["pos"]}px)`;
	},

	moveImageOneStep: function (idx) {
		this.imgObject[idx]["img"].style.transition = "transform 0.5s";
		this.imgObject[idx]["pos"] -= this.imageList.offsetWidth;
		this.imgObject[idx]["img"].style.transform = `translateX(${this.imgObject[idx]["pos"]}px)`;
	},

	slideImage: function () {
		setTimeout(() => {
			for (let i = 0, flag = false; i < this.imgObject.length; i++) {
				if (this.slideLen > 2) {
					let next = this.getNextIndex(i);
					this.moveImageOneStep(i);

					if (this.imgObject[next]["pos"] < -this.imgObject[next]["idx"] * this.imageList.offsetWidth) {
						this.moveImageEnd(next);
					}
				} else {
					if (this.imgObject[i]["pos"] <= -this.imgObject[i]["idx"] * this.imageList.offsetWidth) {
						this.moveImageEnd(i);
						flag = true;
					} else {
						let next = this.getNextIndex(i);

						if (next != i && this.imgObject[this.getNextIndex(0)]["pos"] === -this.imgObject[this.getNextIndex(0)]["idx"] * this.imageList.offsetWidth) {
							this.moveImageEnd(next);
						}

						this.moveImageOneStep(i);

						if (flag === true) {
							this.moveImageOneStep(next);
						}
					}
				}
			}
			this.slideImage();
		}, 1500);
	}
};

// Execute all functions
document.addEventListener("DOMContentLoaded", function () {
	promotionObj.initPromotion();
	eventTabObj.initEventTab();
});
