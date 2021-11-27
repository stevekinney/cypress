/// <reference types="@sveltejs/kit" />

type Item = {
	id: number;
	title: string;
	packed: boolean;
};

type Post = {
	text: string;
	id: number;
	createdAt: string;
};
