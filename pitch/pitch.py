from pydub import AudioSegment, effects
from pydub.playback import play


def pitch_change(file_path, octaves=-0.2):
    sound = AudioSegment.from_mp3(file_path)

    new_sample_rate = int(sound.frame_rate * (2.0 ** octaves))

    lowpitch_sound = sound._spawn(sound.raw_data, overrides={'frame_rate': new_sample_rate})
    return lowpitch_sound