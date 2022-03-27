try {
    function time(time) {
		time2 = new Date().getTime();
		msec = time2 - Number(time);
		detik = msec/1000;
		menit = detik/60;
		jam = menit/60;
		hari = jam/24;
		minggu = hari/7;
		jam_str = Number(String(jam).split('.')[0]);
		menit_str = Number(String(menit).split('.')[0]);
		detik_str = Number(String(detik).split('.')[0]);
		hari_str = Number(String(hari).split('.')[0]);
		minggu_str = Number(String(minggu).split('.')[0]);

		if (minggu_str > 0 && minggu_str < 7) {
			return `<small>${minggu_str} weeks ago</small>`;
		} else if (minggu > 52.1428571 && minggu_str > 7) {
			return `<small>a few years ago</small>`;
		} else if (detik < 60 && detik_str > 0) {
			return `<small>${detik_str} sec ago</small>`;
		} else if (menit < 60 && menit_str > 0) {
			return `<small>${menit_str} mins ago</small>`;
		} else if (jam < 24 && jam_str > 0) {
			return `<small>${jam_str} hours ago</small>`;
		} else if (hari < 7 && hari_str > 0) {
			return `<small>${hari_str} days ago</small>`;
		} else {
			return `<small>${hari_str} days ago</small>`;
		}
	}
    {
			swal.fire({
				title: 'do you want to play your own song from youtube?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Yes',
				cancelButtonText: `No`,
			}).then((result) => {

				if (result.isConfirmed) {
					swal.fire({
						title: 'Enter youtube link to play !',
						input: 'url',
						inputAttributes: {
							autocapitalize: 'off',
							pattern: '^https?:\/\/(www.)?(youtu.be\/)?(youtube.com\/watch)?.*'
						},
						showLoaderOnConfirm: true,
						confirmButtonText: 'Play it !',
						showCancelButton: true,
						preConfirm: (value)=> {
							if (!/^https?\:\/\/(www\.|m\.)?(youtube\.com\/watch\?v=|youtu\.be\/)(.+$)/.test(value)) {
								Swal.showValidationMessage(
									`url yang anda masukkan tidak valid`
								);
							} else {
								return fetch('https://hadi-api.herokuapp.com/api/yt2/audio?url='+value).then(resp=>resp.json()).then(resp=> {
									if (resp.status == 200) {
										var audio = document.createElement('audio');
										audio.autoplay = "autoplay";
										audio.src = resp.result.download_audio;
										audio.onended = function() {
											Swal.fire({
												title: 'the music has finished do you want to play it back?',
												icon: 'warning',
												showCancelButton: true,
												confirmButtonText: 'Yes',
												cancelButtonText: `No`,
											}).then(answer=> {
												if (answer.isConfirmed) {
													document.querySelector('audio').play()
												}
											})
										}
										document.body.appendChild(audio);
										requestmenu();
									} else {
										Swal.showValidationMessage(
											`periksa kembali url yang anda masukkan`
										)
									}
								})
							}
						}
					}).then(answer=> {
						requestmenu();
					})
				} else {
					requestmenu();
				}
			})
		}
}
