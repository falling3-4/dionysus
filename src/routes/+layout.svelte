<script lang="ts">
	import favicon from '$lib/assets/favicon.webp';
	import '../app.css';

	let { children } = $props();

	let resizing = false;
	let sidebar: HTMLTableCellElement;
	let content: HTMLTableCellElement;

	function startResize(e: MouseEvent) {
		resizing = true;
	}

	function doResize(e: MouseEvent) {
		if (resizing) {
			const sidebarWidth = e.clientX - sidebar.getBoundingClientRect().left;
			sidebar.style.width = `${sidebarWidth}px`;
			content.style.width = `${1200 - sidebarWidth}px`;
		}
	}

	function stopResize() {
		resizing = false;
	}
</script>

<svelte:window on:mousemove={doResize} on:mouseup={stopResize} />

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<table width="1200" align="center" cellpadding="0" cellspacing="0" border="0" class="main-table">
	<tbody>
		<tr>
			<td colspan="3" class="header">
				<img src="/img/header.png" alt="DIONYSUS" class="header-img" />
			</td>
		</tr>
		<tr>
			<td bind:this={sidebar} width="200" valign="top" class="sidebar">
				<h3 class="sidebar-title">Temple Navigation</h3>

				<ul class="sidebar-nav">
					<li class="sidebar-nav-item">
						<a href="/" class="sidebar-nav-link">✦ Home</a>
					</li>
					<li class="sidebar-nav-item">
						<a href="/p" class="sidebar-nav-link">✦ Network</a>
					</li>
					<li class="sidebar-nav-item">
						<a href="/g" class="sidebar-nav-link">✦ Play</a>
					</li>
				</ul>
			</td>
			<td class="resizer" onmousedown={startResize}></td>
			<td bind:this={content} width="800" valign="top" class="content">
				<div class="content-inner">
					{@render children()}
				</div>
			</td>
		</tr>
		<tr>
			<td colspan="3" class="footer">
				© {new Date(Date.now()).getFullYear()} DIONYSUS /
				<a href="https://3-4.gay" target="_blank">falling3_4</a>
			</td>
		</tr>
	</tbody>
</table>
