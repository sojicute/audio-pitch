from django.shortcuts import render
from rest_framework.viewsets import ViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
from django.http import FileResponse, HttpResponse
from rest_framework.permissions import AllowAny

from .pitch import pitch_change
from pydub import AudioSegment
from django.http import HttpResponse, Http404
import os
from django.conf import settings


class FileUploadView(APIView):
    parser_classes = (FileUploadParser,)

    def post(self, request, filename, format=None):
        file_obj = request.FILES['file']

        slow_sound = pitch_change(file_obj.file.name, octaves=-0.2)

        slow_sound.export(filename, format="mp3")

        audio = open(filename, 'rb')

        response = HttpResponse(audio, content_type='audio/mpeg')
        # response['Content-Disposition'] = "attachment; filename=%s - %s.mp3" % ("Nirvana", "In-bloom")
        return response
