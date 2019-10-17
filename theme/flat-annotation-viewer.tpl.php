<?php if (true === $accessible) : ?>
    <annotation-viewer url="<?php echo $url; ?>" show-timestamps="<?php echo $show_timestamps == 1 ? 'true' : 'false'; ?>" width="<?php echo $width; ?>" height="<?php echo $height; ?>"></annotation-viewer>
<?php else : ?>
    This file is not accessible to you.
<?php endif; ?>
