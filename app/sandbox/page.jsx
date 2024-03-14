"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

import { getFilterProducts, productFilter, returnFilters } from "@/libs/utils"
import NewDropDown from "../components/Store Components/FilterComponents/NewDropDown"

export default function Page({ searchParams }) {
	//prop:
	const data = [
		{
			product_data: {
				product_id: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
				created_at: "2024-03-01T18:02:25.009279+00:00",
				title: "Nonstop",
				type: "Melody",
				release_date: "2024-03-01",
				description: "definitely copyright but idc",
				tags: ["Drake", "Party", "Hype"],
				genres: ["R&b", "Hip Hop", "Hype"],
				moods: ["Chill", "Lit"],
				keys: "CM",
				bpm: 107,
				instruments: ["Bass", "Drums", "Snare", "Synth"],
				user_id: "26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
				release_date_long: "March 1, 2024 ",
				free: true,
				video_link: "https://www.youtube.com/watch?v=QVqS3tB8OtE",
				likes: 0,
			},
			pricing: [
				{
					pricing_id: "e004ee31-3994-4c47-a66f-c9c676cbd195",
					price: 30,
					type_id: "basic",
					is_active: true,
				},
				{
					pricing_id: "80ca3885-012c-4bb9-9cd2-257d7094831d",
					price: 50,
					type_id: "premium",
					is_active: false,
				},
				{
					pricing_id: "f64617fc-c34f-45db-8f39-e7a022c27c75",
					price: 250,
					type_id: "exclusive",
					is_active: false,
				},
			],
			product_files: [
				{
					product_id: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
					pricing_id: "e004ee31-3994-4c47-a66f-c9c676cbd195",
					file_extension: ".mp3",
					file_url:
						"fa6255df-90cd-4ba2-b6b5-708c86dffa39/e004ee31-3994-4c47-a66f-c9c676cbd195",
				},
				{
					product_id: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
					pricing_id: "80ca3885-012c-4bb9-9cd2-257d7094831d",
					file_extension: ".wav",
					file_url:
						"fa6255df-90cd-4ba2-b6b5-708c86dffa39/80ca3885-012c-4bb9-9cd2-257d7094831d",
				},
				{
					product_id: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
					pricing_id: "f64617fc-c34f-45db-8f39-e7a022c27c75",
					file_extension: ".zip",
					file_url:
						"fa6255df-90cd-4ba2-b6b5-708c86dffa39/f64617fc-c34f-45db-8f39-e7a022c27c75",
				},
			],
			product_likes: {
				product_id: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
				likes: 4,
				liked_by_id: [
					"8e19f165-7d8c-48dc-b915-584fca7b0a2e",
					"9907242e-8d03-4128-855f-627a6aa47f80",
					"83466edf-f34a-4f84-82fe-b507d1229954",
				],
				liked_by_email: [
					"cokingtins1@outlook.com",
					"flexdrpeppa1212@gmail.com",
					"flexdrpeppa1212@gmail.com",
				],
			},
			startingPrice: {
				pricing_id: "e004ee31-3994-4c47-a66f-c9c676cbd195",
				price: 30,
				type_id: "basic",
				is_active: true,
			},
			sortedPricing: {
				startingPrice: {
					name: "basic",
					price: 30,
					pricing_id: "e004ee31-3994-4c47-a66f-c9c676cbd195",
					product_id: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
					isActive: true,
				},
				pricing: [
					{
						name: "basic",
						price: 30,
						pricing_id: "e004ee31-3994-4c47-a66f-c9c676cbd195",
						product_id: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
						isActive: true,
					},
					{
						name: "premium",
						price: 50,
						pricing_id: "80ca3885-012c-4bb9-9cd2-257d7094831d",
						product_id: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
						isActive: false,
					},
					{
						name: "exclusive",
						price: 250,
						pricing_id: "f64617fc-c34f-45db-8f39-e7a022c27c75",
						product_id: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
						isActive: false,
					},
				],
				pricingShort: {
					basic: {
						price: 30,
						isActive: true,
					},
					premium: {
						price: 50,
						isActive: false,
					},
					exclusive: {
						price: 250,
						isActive: false,
					},
				},
				filteredPricing: [
					{
						name: "basic",
						price: 30,
						pricing_id: "e004ee31-3994-4c47-a66f-c9c676cbd195",
						product_id: "fa6255df-90cd-4ba2-b6b5-708c86dffa39",
						isActive: true,
					},
				],
				free: true,
			},
			isFree: true,
			productLikes: 4,
			imageSrc:
				"https://njowjcfiaxbnflrcwcep.supabase.co/storage/v1/object/public/all_products/fa6255df-90cd-4ba2-b6b5-708c86dffa39/productImage/af4181133125831.61b74094919a9.jpg",
			storeSrc:
				"https://njowjcfiaxbnflrcwcep.supabase.co/storage/v1/object/public/all_products/fa6255df-90cd-4ba2-b6b5-708c86dffa39/e004ee31-3994-4c47-a66f-c9c676cbd195",
			storeSrcType: "audio/mpeg",
			session: {
				expires_at: 1710434162,
				expires_in: 2320,
				token_type: "bearer",
				access_token:
					"eyJhbGciOiJIUzI1NiIsImtpZCI6ImpsbkpBUSt1MFRaangwaDAiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzEwNDM0MTYyLCJpYXQiOjE3MTA0MzA1NjIsImlzcyI6Imh0dHBzOi8vbmpvd2pjZmlheGJuZmxyY3djZXAuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjI2ZGNiYjBkLTM0NDctNDAyMS05ZDhjLTlhNGUyYmFkZDMxYyIsImVtYWlsIjoic2VhbmNva2luZ3RpbkBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTcxMDM0Nzg4MH1dLCJzZXNzaW9uX2lkIjoiZWIyY2JkMGUtNTI2ZS00M2I4LTg5MWQtZWQ0M2JhMWVkNmEyIn0.SMiEwZ6WX7Ju3BVLiQWAeQRye3kLOdvIVZi7hCbEl4A",
				refresh_token: "7Vw73cMAdXoApH4SNwGyaA",
				provider_token: null,
				provider_refresh_token: null,
				user: {
					id: "26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
					factors: null,
					aud: "authenticated",
					iat: 1710430562,
					iss: "https://njowjcfiaxbnflrcwcep.supabase.co/auth/v1",
					email: "seancokingtin@gmail.com",
					phone: "",
					app_metadata: {
						provider: "email",
						providers: ["email"],
					},
					user_metadata: {},
					role: "authenticated",
					aal: "aal1",
					amr: [
						{
							method: "password",
							timestamp: 1710347880,
						},
					],
					session_id: "eb2cbd0e-526e-43b8-891d-ed43ba1ed6a2",
				},
			},
			likedByUser: false,
		},
		{
			product_data: {
				product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
				created_at: "2024-03-09T01:56:36.772184+00:00",
				title: "Alright",
				type: "Beat",
				release_date: "2024-03-09",
				description: "Drake type beat.",
				tags: ["Drake Type Beat", "Drake"],
				genres: ["Hip Hop"],
				moods: ["Happy"],
				keys: "None",
				bpm: 133,
				instruments: ["Synth", "Drums", "Vocals"],
				user_id: "26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
				release_date_long: "March 8, 2024 ",
				free: true,
				video_link: "",
				likes: 0,
			},
			pricing: [
				{
					pricing_id: "e3a2321e-5bc4-4719-8fca-f14838c83f93",
					price: 30,
					type_id: "basic",
					is_active: true,
				},
				{
					pricing_id: "13bec3a9-5fe2-4052-b503-61b845cad01d",
					price: 50,
					type_id: "premium",
					is_active: true,
				},
				{
					pricing_id: "1a277bba-ff39-40f9-850c-0eecf780f84a",
					price: 250,
					type_id: "exclusive",
					is_active: false,
				},
			],
			product_files: [
				{
					product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
					pricing_id: "e3a2321e-5bc4-4719-8fca-f14838c83f93",
					file_extension: ".mp3",
					file_url:
						"6499532d-6983-45d7-a90e-4a9c2a787381/e3a2321e-5bc4-4719-8fca-f14838c83f93",
				},
				{
					product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
					pricing_id: "13bec3a9-5fe2-4052-b503-61b845cad01d",
					file_extension: ".wav",
					file_url:
						"6499532d-6983-45d7-a90e-4a9c2a787381/13bec3a9-5fe2-4052-b503-61b845cad01d",
				},
				{
					product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
					pricing_id: "1a277bba-ff39-40f9-850c-0eecf780f84a",
					file_extension: ".zip",
					file_url:
						"6499532d-6983-45d7-a90e-4a9c2a787381/1a277bba-ff39-40f9-850c-0eecf780f84a",
				},
			],
			product_likes: {
				product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
				likes: 1,
				liked_by_id: ["26dcbb0d-3447-4021-9d8c-9a4e2badd31c"],
				liked_by_email: ["seancokingtin@gmail.com"],
			},
			startingPrice: {
				pricing_id: "e3a2321e-5bc4-4719-8fca-f14838c83f93",
				price: 30,
				type_id: "basic",
				is_active: true,
			},
			sortedPricing: {
				startingPrice: {
					name: "basic",
					price: 30,
					pricing_id: "e3a2321e-5bc4-4719-8fca-f14838c83f93",
					product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
					isActive: true,
				},
				pricing: [
					{
						name: "basic",
						price: 30,
						pricing_id: "e3a2321e-5bc4-4719-8fca-f14838c83f93",
						product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
						isActive: true,
					},
					{
						name: "premium",
						price: 50,
						pricing_id: "13bec3a9-5fe2-4052-b503-61b845cad01d",
						product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
						isActive: true,
					},
					{
						name: "exclusive",
						price: 250,
						pricing_id: "1a277bba-ff39-40f9-850c-0eecf780f84a",
						product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
						isActive: false,
					},
				],
				pricingShort: {
					basic: {
						price: 30,
						isActive: true,
					},
					premium: {
						price: 50,
						isActive: true,
					},
					exclusive: {
						price: 250,
						isActive: false,
					},
				},
				filteredPricing: [
					{
						name: "basic",
						price: 30,
						pricing_id: "e3a2321e-5bc4-4719-8fca-f14838c83f93",
						product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
						isActive: true,
					},
					{
						name: "premium",
						price: 50,
						pricing_id: "13bec3a9-5fe2-4052-b503-61b845cad01d",
						product_id: "6499532d-6983-45d7-a90e-4a9c2a787381",
						isActive: true,
					},
				],
				free: true,
			},
			isFree: true,
			productLikes: 1,
			imageSrc:
				"https://njowjcfiaxbnflrcwcep.supabase.co/storage/v1/object/public/all_products/6499532d-6983-45d7-a90e-4a9c2a787381/productImage/futuristic-alien-rap-album-cover_pyIUT.png",
			storeSrc:
				"https://njowjcfiaxbnflrcwcep.supabase.co/storage/v1/object/public/all_products/6499532d-6983-45d7-a90e-4a9c2a787381/e3a2321e-5bc4-4719-8fca-f14838c83f93",
			storeSrcType: "audio/mpeg",
			session: {
				expires_at: 1710434162,
				expires_in: 2320,
				token_type: "bearer",
				access_token:
					"eyJhbGciOiJIUzI1NiIsImtpZCI6ImpsbkpBUSt1MFRaangwaDAiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzEwNDM0MTYyLCJpYXQiOjE3MTA0MzA1NjIsImlzcyI6Imh0dHBzOi8vbmpvd2pjZmlheGJuZmxyY3djZXAuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjI2ZGNiYjBkLTM0NDctNDAyMS05ZDhjLTlhNGUyYmFkZDMxYyIsImVtYWlsIjoic2VhbmNva2luZ3RpbkBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTcxMDM0Nzg4MH1dLCJzZXNzaW9uX2lkIjoiZWIyY2JkMGUtNTI2ZS00M2I4LTg5MWQtZWQ0M2JhMWVkNmEyIn0.SMiEwZ6WX7Ju3BVLiQWAeQRye3kLOdvIVZi7hCbEl4A",
				refresh_token: "7Vw73cMAdXoApH4SNwGyaA",
				provider_token: null,
				provider_refresh_token: null,
				user: {
					id: "26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
					factors: null,
					aud: "authenticated",
					iat: 1710430562,
					iss: "https://njowjcfiaxbnflrcwcep.supabase.co/auth/v1",
					email: "seancokingtin@gmail.com",
					phone: "",
					app_metadata: {
						provider: "email",
						providers: ["email"],
					},
					user_metadata: {},
					role: "authenticated",
					aal: "aal1",
					amr: [
						{
							method: "password",
							timestamp: 1710347880,
						},
					],
					session_id: "eb2cbd0e-526e-43b8-891d-ed43ba1ed6a2",
				},
			},
			likedByUser: true,
		},
		{
			product_data: {
				product_id: "1c6782b4-d34f-4659-bb53-bfd09020be10",
				created_at: "2024-03-11T12:29:07.552975+00:00",
				title: "Test Upload",
				type: "Melody",
				release_date: "2024-03-11",
				description: "test beat",
				tags: ["Drake", "Drake Type Beat"],
				genres: ["Hip Hop", "Rap", "Trap"],
				moods: ["Hype", "Chill", "Cool"],
				keys: "None",
				bpm: 55,
				instruments: ["Drums", "Bass"],
				user_id: "26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
				release_date_long: "March 11, 2024 ",
				free: false,
				video_link: "",
				likes: 0,
			},
			pricing: [
				{
					pricing_id: "a7a759dd-18e6-435a-b137-2db5f97a3dc5",
					price: 25,
					type_id: "basic",
					is_active: true,
				},
				{
					pricing_id: "5c86330e-50ba-45aa-9376-986184386c27",
					price: 50,
					type_id: "premium",
					is_active: false,
				},
				{
					pricing_id: "97848498-1c66-477a-8a4f-e38160b175b9",
					price: 250,
					type_id: "exclusive",
					is_active: false,
				},
			],
			product_files: [
				{
					product_id: "1c6782b4-d34f-4659-bb53-bfd09020be10",
					pricing_id: "a7a759dd-18e6-435a-b137-2db5f97a3dc5",
					file_extension: ".mp3",
					file_url:
						"1c6782b4-d34f-4659-bb53-bfd09020be10/a7a759dd-18e6-435a-b137-2db5f97a3dc5",
				},
				{
					product_id: "1c6782b4-d34f-4659-bb53-bfd09020be10",
					pricing_id: "5c86330e-50ba-45aa-9376-986184386c27",
					file_extension: ".wav",
					file_url:
						"1c6782b4-d34f-4659-bb53-bfd09020be10/5c86330e-50ba-45aa-9376-986184386c27",
				},
				{
					product_id: "1c6782b4-d34f-4659-bb53-bfd09020be10",
					pricing_id: "97848498-1c66-477a-8a4f-e38160b175b9",
					file_extension: ".zip",
					file_url:
						"1c6782b4-d34f-4659-bb53-bfd09020be10/97848498-1c66-477a-8a4f-e38160b175b9",
				},
			],
			product_likes: {
				product_id: "1c6782b4-d34f-4659-bb53-bfd09020be10",
				likes: 1,
				liked_by_id: ["26dcbb0d-3447-4021-9d8c-9a4e2badd31c"],
				liked_by_email: ["seancokingtin@gmail.com"],
			},
			startingPrice: {
				pricing_id: "a7a759dd-18e6-435a-b137-2db5f97a3dc5",
				price: 25,
				type_id: "basic",
				is_active: true,
			},
			sortedPricing: {
				startingPrice: {
					name: "basic",
					price: 25,
					pricing_id: "a7a759dd-18e6-435a-b137-2db5f97a3dc5",
					product_id: "1c6782b4-d34f-4659-bb53-bfd09020be10",
					isActive: true,
				},
				pricing: [
					{
						name: "basic",
						price: 25,
						pricing_id: "a7a759dd-18e6-435a-b137-2db5f97a3dc5",
						product_id: "1c6782b4-d34f-4659-bb53-bfd09020be10",
						isActive: true,
					},
					{
						name: "premium",
						price: 50,
						pricing_id: "5c86330e-50ba-45aa-9376-986184386c27",
						product_id: "1c6782b4-d34f-4659-bb53-bfd09020be10",
						isActive: false,
					},
					{
						name: "exclusive",
						price: 250,
						pricing_id: "97848498-1c66-477a-8a4f-e38160b175b9",
						product_id: "1c6782b4-d34f-4659-bb53-bfd09020be10",
						isActive: false,
					},
				],
				pricingShort: {
					basic: {
						price: 25,
						isActive: true,
					},
					premium: {
						price: 50,
						isActive: false,
					},
					exclusive: {
						price: 250,
						isActive: false,
					},
				},
				filteredPricing: [
					{
						name: "basic",
						price: 25,
						pricing_id: "a7a759dd-18e6-435a-b137-2db5f97a3dc5",
						product_id: "1c6782b4-d34f-4659-bb53-bfd09020be10",
						isActive: true,
					},
				],
				free: false,
			},
			isFree: false,
			productLikes: 1,
			imageSrc:
				"https://njowjcfiaxbnflrcwcep.supabase.co/storage/v1/object/public/all_products/1c6782b4-d34f-4659-bb53-bfd09020be10/productImage/canva-red-fingerprint-mixtape-cover-artwork-49BRDBnXYXU.jpg",
			storeSrc:
				"https://njowjcfiaxbnflrcwcep.supabase.co/storage/v1/object/public/all_products/1c6782b4-d34f-4659-bb53-bfd09020be10/a7a759dd-18e6-435a-b137-2db5f97a3dc5",
			storeSrcType: "audio/mpeg",
			session: {
				expires_at: 1710434162,
				expires_in: 2320,
				token_type: "bearer",
				access_token:
					"eyJhbGciOiJIUzI1NiIsImtpZCI6ImpsbkpBUSt1MFRaangwaDAiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzEwNDM0MTYyLCJpYXQiOjE3MTA0MzA1NjIsImlzcyI6Imh0dHBzOi8vbmpvd2pjZmlheGJuZmxyY3djZXAuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjI2ZGNiYjBkLTM0NDctNDAyMS05ZDhjLTlhNGUyYmFkZDMxYyIsImVtYWlsIjoic2VhbmNva2luZ3RpbkBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTcxMDM0Nzg4MH1dLCJzZXNzaW9uX2lkIjoiZWIyY2JkMGUtNTI2ZS00M2I4LTg5MWQtZWQ0M2JhMWVkNmEyIn0.SMiEwZ6WX7Ju3BVLiQWAeQRye3kLOdvIVZi7hCbEl4A",
				refresh_token: "7Vw73cMAdXoApH4SNwGyaA",
				provider_token: null,
				provider_refresh_token: null,
				user: {
					id: "26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
					factors: null,
					aud: "authenticated",
					iat: 1710430562,
					iss: "https://njowjcfiaxbnflrcwcep.supabase.co/auth/v1",
					email: "seancokingtin@gmail.com",
					phone: "",
					app_metadata: {
						provider: "email",
						providers: ["email"],
					},
					user_metadata: {},
					role: "authenticated",
					aal: "aal1",
					amr: [
						{
							method: "password",
							timestamp: 1710347880,
						},
					],
					session_id: "eb2cbd0e-526e-43b8-891d-ed43ba1ed6a2",
				},
			},
			likedByUser: true,
		},
		{
			product_data: {
				product_id: "051cd3d3-bad5-483c-9696-6b5782d0a3c5",
				created_at: "2024-03-11T13:01:40.817381+00:00",
				title: "Alright Test 2",
				type: "Drum Kit",
				release_date: "2024-03-11",
				description: "test",
				tags: ["Hyphy", "Lit", "Sick"],
				genres: ["Hyphy", "West Coast"],
				moods: ["Chill", "Cool"],
				keys: "None",
				bpm: 111,
				instruments: ["Synth", "Drums"],
				user_id: "26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
				release_date_long: "March 11, 2024 ",
				free: false,
				video_link: "",
				likes: 0,
			},
			pricing: [
				{
					pricing_id: "6f5f9bf2-0505-4bde-8c6b-105b088c9f72",
					price: 30,
					type_id: "basic",
					is_active: true,
				},
				{
					pricing_id: "89c88ac6-8174-4250-923a-132d6cb3383f",
					price: 50,
					type_id: "premium",
					is_active: false,
				},
				{
					pricing_id: "cb79a528-83df-4400-b989-10d551f8e88e",
					price: 250,
					type_id: "exclusive",
					is_active: false,
				},
			],
			product_files: [
				{
					product_id: "051cd3d3-bad5-483c-9696-6b5782d0a3c5",
					pricing_id: "6f5f9bf2-0505-4bde-8c6b-105b088c9f72",
					file_extension: ".mp3",
					file_url:
						"051cd3d3-bad5-483c-9696-6b5782d0a3c5/6f5f9bf2-0505-4bde-8c6b-105b088c9f72",
				},
				{
					product_id: "051cd3d3-bad5-483c-9696-6b5782d0a3c5",
					pricing_id: "89c88ac6-8174-4250-923a-132d6cb3383f",
					file_extension: ".wav",
					file_url:
						"051cd3d3-bad5-483c-9696-6b5782d0a3c5/89c88ac6-8174-4250-923a-132d6cb3383f",
				},
				{
					product_id: "051cd3d3-bad5-483c-9696-6b5782d0a3c5",
					pricing_id: "cb79a528-83df-4400-b989-10d551f8e88e",
					file_extension: ".zip",
					file_url:
						"051cd3d3-bad5-483c-9696-6b5782d0a3c5/cb79a528-83df-4400-b989-10d551f8e88e",
				},
			],
			product_likes: {
				product_id: "051cd3d3-bad5-483c-9696-6b5782d0a3c5",
				likes: 1,
				liked_by_id: ["26dcbb0d-3447-4021-9d8c-9a4e2badd31c"],
				liked_by_email: ["seancokingtin@gmail.com"],
			},
			startingPrice: {
				pricing_id: "6f5f9bf2-0505-4bde-8c6b-105b088c9f72",
				price: 30,
				type_id: "basic",
				is_active: true,
			},
			sortedPricing: {
				startingPrice: {
					name: "basic",
					price: 30,
					pricing_id: "6f5f9bf2-0505-4bde-8c6b-105b088c9f72",
					product_id: "051cd3d3-bad5-483c-9696-6b5782d0a3c5",
					isActive: true,
				},
				pricing: [
					{
						name: "basic",
						price: 30,
						pricing_id: "6f5f9bf2-0505-4bde-8c6b-105b088c9f72",
						product_id: "051cd3d3-bad5-483c-9696-6b5782d0a3c5",
						isActive: true,
					},
					{
						name: "premium",
						price: 50,
						pricing_id: "89c88ac6-8174-4250-923a-132d6cb3383f",
						product_id: "051cd3d3-bad5-483c-9696-6b5782d0a3c5",
						isActive: false,
					},
					{
						name: "exclusive",
						price: 250,
						pricing_id: "cb79a528-83df-4400-b989-10d551f8e88e",
						product_id: "051cd3d3-bad5-483c-9696-6b5782d0a3c5",
						isActive: false,
					},
				],
				pricingShort: {
					basic: {
						price: 30,
						isActive: true,
					},
					premium: {
						price: 50,
						isActive: false,
					},
					exclusive: {
						price: 250,
						isActive: false,
					},
				},
				filteredPricing: [
					{
						name: "basic",
						price: 30,
						pricing_id: "6f5f9bf2-0505-4bde-8c6b-105b088c9f72",
						product_id: "051cd3d3-bad5-483c-9696-6b5782d0a3c5",
						isActive: true,
					},
				],
				free: false,
			},
			isFree: false,
			productLikes: 1,
			imageSrc:
				"https://njowjcfiaxbnflrcwcep.supabase.co/storage/v1/object/public/all_products/051cd3d3-bad5-483c-9696-6b5782d0a3c5/productImage/80e0c87f16aed3b398f1276cf59df9fb.jpg",
			storeSrc:
				"https://njowjcfiaxbnflrcwcep.supabase.co/storage/v1/object/public/all_products/051cd3d3-bad5-483c-9696-6b5782d0a3c5/6f5f9bf2-0505-4bde-8c6b-105b088c9f72",
			storeSrcType: "audio/mpeg",
			session: {
				expires_at: 1710434162,
				expires_in: 2320,
				token_type: "bearer",
				access_token:
					"eyJhbGciOiJIUzI1NiIsImtpZCI6ImpsbkpBUSt1MFRaangwaDAiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzEwNDM0MTYyLCJpYXQiOjE3MTA0MzA1NjIsImlzcyI6Imh0dHBzOi8vbmpvd2pjZmlheGJuZmxyY3djZXAuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjI2ZGNiYjBkLTM0NDctNDAyMS05ZDhjLTlhNGUyYmFkZDMxYyIsImVtYWlsIjoic2VhbmNva2luZ3RpbkBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTcxMDM0Nzg4MH1dLCJzZXNzaW9uX2lkIjoiZWIyY2JkMGUtNTI2ZS00M2I4LTg5MWQtZWQ0M2JhMWVkNmEyIn0.SMiEwZ6WX7Ju3BVLiQWAeQRye3kLOdvIVZi7hCbEl4A",
				refresh_token: "7Vw73cMAdXoApH4SNwGyaA",
				provider_token: null,
				provider_refresh_token: null,
				user: {
					id: "26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
					factors: null,
					aud: "authenticated",
					iat: 1710430562,
					iss: "https://njowjcfiaxbnflrcwcep.supabase.co/auth/v1",
					email: "seancokingtin@gmail.com",
					phone: "",
					app_metadata: {
						provider: "email",
						providers: ["email"],
					},
					user_metadata: {},
					role: "authenticated",
					aal: "aal1",
					amr: [
						{
							method: "password",
							timestamp: 1710347880,
						},
					],
					session_id: "eb2cbd0e-526e-43b8-891d-ed43ba1ed6a2",
				},
			},
			likedByUser: true,
		},
		{
			product_data: {
				product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
				created_at: "2024-03-05T16:04:42.558622+00:00",
				title: "Avec Toi 91 BPM - @1trav x Trevbaj (Drake)_Master",
				type: "Drum Kit",
				release_date: "2024-03-05",
				description: "cool beat",
				tags: ["Drake", "Drake Type Beat"],
				genres: ["Rap", "Trap"],
				moods: ["Chill", "Hype"],
				keys: "None",
				bpm: 55,
				instruments: ["Bass", "Drums"],
				user_id: "292e2950-49b1-4637-9697-83d33751e6f4",
				release_date_long: "March 5, 2024 ",
				free: true,
				video_link: "",
				likes: 0,
			},
			pricing: [
				{
					pricing_id: "8b04e1e8-9b25-4249-baf6-28fe8a102bdd",
					price: 30,
					type_id: "basic",
					is_active: true,
				},
				{
					pricing_id: "9e0d7318-ade6-48b6-a469-177dc9ef1cfd",
					price: 50,
					type_id: "premium",
					is_active: true,
				},
				{
					pricing_id: "059f7ec7-b93c-4425-b6a2-34ef77e20989",
					price: 250,
					type_id: "exclusive",
					is_active: false,
				},
			],
			product_files: [
				{
					product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
					pricing_id: "8b04e1e8-9b25-4249-baf6-28fe8a102bdd",
					file_extension: ".mp3",
					file_url:
						"f28d8314-532e-42a7-b697-23d53135a86b/8b04e1e8-9b25-4249-baf6-28fe8a102bdd",
				},
				{
					product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
					pricing_id: "9e0d7318-ade6-48b6-a469-177dc9ef1cfd",
					file_extension: ".wav",
					file_url:
						"f28d8314-532e-42a7-b697-23d53135a86b/9e0d7318-ade6-48b6-a469-177dc9ef1cfd",
				},
				{
					product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
					pricing_id: "059f7ec7-b93c-4425-b6a2-34ef77e20989",
					file_extension: ".zip",
					file_url:
						"f28d8314-532e-42a7-b697-23d53135a86b/059f7ec7-b93c-4425-b6a2-34ef77e20989",
				},
			],
			product_likes: {
				product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
				likes: 9,
				liked_by_id: [
					"8e19f165-7d8c-48dc-b915-584fca7b0a2e",
					"d475aef3-69c9-45a8-aa90-f701b916180b",
					"9907242e-8d03-4128-855f-627a6aa47f80",
					"a164f8d0-eb80-4ade-a685-668510281cfc",
					"83466edf-f34a-4f84-82fe-b507d1229954",
					"26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
				],
				liked_by_email: [
					"cokingtins1@outlook.com",
					"flexdrpeppa1212@gmail.com",
					"flexdrpeppa1212@gmail.com",
					"flexdrpeppa1212@gmail.com",
					"flexdrpeppa1212@gmail.com",
					"seancokingtin@gmail.com",
				],
			},
			startingPrice: {
				pricing_id: "8b04e1e8-9b25-4249-baf6-28fe8a102bdd",
				price: 30,
				type_id: "basic",
				is_active: true,
			},
			sortedPricing: {
				startingPrice: {
					name: "basic",
					price: 30,
					pricing_id: "8b04e1e8-9b25-4249-baf6-28fe8a102bdd",
					product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
					isActive: true,
				},
				pricing: [
					{
						name: "basic",
						price: 30,
						pricing_id: "8b04e1e8-9b25-4249-baf6-28fe8a102bdd",
						product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
						isActive: true,
					},
					{
						name: "premium",
						price: 50,
						pricing_id: "9e0d7318-ade6-48b6-a469-177dc9ef1cfd",
						product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
						isActive: true,
					},
					{
						name: "exclusive",
						price: 250,
						pricing_id: "059f7ec7-b93c-4425-b6a2-34ef77e20989",
						product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
						isActive: false,
					},
				],
				pricingShort: {
					basic: {
						price: 30,
						isActive: true,
					},
					premium: {
						price: 50,
						isActive: true,
					},
					exclusive: {
						price: 250,
						isActive: false,
					},
				},
				filteredPricing: [
					{
						name: "basic",
						price: 30,
						pricing_id: "8b04e1e8-9b25-4249-baf6-28fe8a102bdd",
						product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
						isActive: true,
					},
					{
						name: "premium",
						price: 50,
						pricing_id: "9e0d7318-ade6-48b6-a469-177dc9ef1cfd",
						product_id: "f28d8314-532e-42a7-b697-23d53135a86b",
						isActive: true,
					},
				],
				free: true,
			},
			isFree: true,
			productLikes: 9,
			imageSrc:
				"https://njowjcfiaxbnflrcwcep.supabase.co/storage/v1/object/public/all_products/f28d8314-532e-42a7-b697-23d53135a86b/productImage/97cfbc5ab50b0c7c43a5549a10f58642.jpg",
			storeSrc:
				"https://njowjcfiaxbnflrcwcep.supabase.co/storage/v1/object/public/all_products/f28d8314-532e-42a7-b697-23d53135a86b/8b04e1e8-9b25-4249-baf6-28fe8a102bdd",
			storeSrcType: "audio/mpeg",
			session: {
				expires_at: 1710434162,
				expires_in: 2320,
				token_type: "bearer",
				access_token:
					"eyJhbGciOiJIUzI1NiIsImtpZCI6ImpsbkpBUSt1MFRaangwaDAiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzEwNDM0MTYyLCJpYXQiOjE3MTA0MzA1NjIsImlzcyI6Imh0dHBzOi8vbmpvd2pjZmlheGJuZmxyY3djZXAuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjI2ZGNiYjBkLTM0NDctNDAyMS05ZDhjLTlhNGUyYmFkZDMxYyIsImVtYWlsIjoic2VhbmNva2luZ3RpbkBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTcxMDM0Nzg4MH1dLCJzZXNzaW9uX2lkIjoiZWIyY2JkMGUtNTI2ZS00M2I4LTg5MWQtZWQ0M2JhMWVkNmEyIn0.SMiEwZ6WX7Ju3BVLiQWAeQRye3kLOdvIVZi7hCbEl4A",
				refresh_token: "7Vw73cMAdXoApH4SNwGyaA",
				provider_token: null,
				provider_refresh_token: null,
				user: {
					id: "26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
					factors: null,
					aud: "authenticated",
					iat: 1710430562,
					iss: "https://njowjcfiaxbnflrcwcep.supabase.co/auth/v1",
					email: "seancokingtin@gmail.com",
					phone: "",
					app_metadata: {
						provider: "email",
						providers: ["email"],
					},
					user_metadata: {},
					role: "authenticated",
					aal: "aal1",
					amr: [
						{
							method: "password",
							timestamp: 1710347880,
						},
					],
					session_id: "eb2cbd0e-526e-43b8-891d-ed43ba1ed6a2",
				},
			},
			likedByUser: true,
		},
	]
	const queryProp = "genres"

	const router = useRouter()
	const sParams = useSearchParams()
	const path = usePathname()
	const queryParam = sParams.get(queryProp)

	const [allFilters, setAllFilters] = useState({})

	// useEffect(() => {
	// 	console.log("router changing")
	// }, [searchParams])

	useEffect(() => {
		setFilteredData(productFilter(data, searchParams))
	}, [searchParams])

	useEffect(() => {
		setFilteredData(productFilter(filteredData, allFilters))
	}, [allFilters])

	const [filteredData, setFilteredData] = useState(() => {
		if (Object.keys(searchParams).length > 0) {
			return getFilterProducts(data, sParams)
		} else {
			return data
		}
	})

	const [genres, allGenres] = useMemo(
		() => returnFilters(filteredData, "genres"),
		[searchParams]
	)
	const [moods, allMoods] = useMemo(
		() => returnFilters(filteredData, "moods"),
		[searchParams]
	)
	const [instruments, allInstruments] = useMemo(
		() => returnFilters(filteredData, "instruments"),
		[filteredData]
	)
	const [tags, allTags] = useMemo(
		() => returnFilters(filteredData, "tags"),
		[filteredData]
	)

	const [selectedGenres, setSelectedGenres] = useState([])

	// const [bpm, setBPM] = useState()

	function filterData(data, moodQuery, genreQuery) {
		if (!moodQuery && !genreQuery) {
			return data
		}

		return data.filter((item) => {
			const productData = item.product_data
			const moodIncluded =
				!moodQuery || productData.moods.includes(moodQuery)
			const genreIncluded =
				!genreQuery || productData.genres.includes(genreQuery)
			return moodIncluded && genreIncluded
		})
	}

	function handleSubmit(e) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const moods = formData.get("moods")
		const genres = formData.get("genres")
		let queryString = `${path}?`

		if (genres !== "") {
			queryString += `genres=${encodeURIComponent(genres)}&`
		}

		router.push(queryString.slice(0, -1))
		setFilteredData(filterData(data, moods, genres))
	}

	return (
		<div className="flex flex-col justify-center items-center mt-[300px]">
			<form
				onSubmit={(e) => {
					handleSubmit(e)
				}}
				className="flex gap-4"
			>
				<NewDropDown
					paramName="genres"
					filter={genres}
					allFilters={allGenres}
					setAllFilters={setAllFilters}
				/>
				<NewDropDown
					paramName="moods"
					filter={moods}
					allFilters={allMoods}
					setAllFilters={setAllFilters}
				/>

				<button type="submit">Search</button>
			</form>

			<ul className="mt-12">
				{filteredData.map((g, index) => (
					<li key={index}>
						{JSON.stringify(g.product_data.product_id)}
					</li>
				))}
			</ul>
		</div>
	)
}
