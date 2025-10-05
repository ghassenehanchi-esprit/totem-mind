@extends('errors::minimal')

@section('title', __('Trop de requêtes'))
@section('code', '429')
@section('message', __('Une autre adresse mail créée depuis le même ordinateur existe déjà, merci d\'utiliser celle-ci !'))
